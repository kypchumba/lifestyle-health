import os
import secrets
import uuid
from pathlib import Path

from fastapi import Depends, FastAPI, File, Header, HTTPException, Response, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from . import crud, models
from .database import Base, SessionLocal, engine, get_db
from .schemas import CatalogOut, CatalogPayload, LoginOut, LoginPayload, NewArrivalPayload, ProductOut, ProductPayload

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "wellness2026")
ACTIVE_TOKENS: set[str] = set()
PROJECT_ROOT = Path(__file__).resolve().parents[2]
UPLOAD_DIR = PROJECT_ROOT / "public" / "uploads"
MAX_UPLOAD_BYTES = 5 * 1024 * 1024
ALLOWED_IMAGE_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
}


def parse_cors_origins() -> list[str]:
    origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
    return [origin.strip() for origin in origins.split(",") if origin.strip()]


app = FastAPI(title="Wellness Wave API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=parse_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def require_admin(authorization: str | None = Header(default=None)) -> None:
    scheme, _, token = (authorization or "").partition(" ")

    if scheme.lower() != "bearer" or token not in ACTIVE_TOKENS:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin login required")


@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=engine)
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

    db = SessionLocal()
    try:
        crud.seed_catalog_if_empty(db)
    finally:
        db.close()


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/api/auth/login", response_model=LoginOut)
def login(payload: LoginPayload) -> LoginOut:
    if payload.username != ADMIN_USERNAME or payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin details")

    token = secrets.token_urlsafe(32)
    ACTIVE_TOKENS.add(token)
    return LoginOut(accessToken=token)


@app.post("/api/auth/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    authorization: str | None = Header(default=None),
    _: None = Depends(require_admin),
) -> Response:
    _, _, token = (authorization or "").partition(" ")
    ACTIVE_TOKENS.discard(token)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.post("/api/uploads/products", dependencies=[Depends(require_admin)])
async def upload_product_image(image: UploadFile = File(...)) -> dict:
    extension = ALLOWED_IMAGE_TYPES.get(image.content_type or "")

    if extension is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Upload a JPG, PNG, WebP, or GIF image.",
        )

    content = await image.read()

    if len(content) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Image must be 5MB or smaller.",
        )

    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
    filename = f"product-{uuid.uuid4().hex}{extension}"
    destination = UPLOAD_DIR / filename
    destination.write_bytes(content)

    return {"imagePath": f"/uploads/{filename}"}


@app.get("/api/catalog", response_model=CatalogOut)
def read_catalog(db: Session = Depends(get_db)) -> dict:
    return crud.get_catalog(db)


@app.put("/api/catalog", response_model=CatalogOut, dependencies=[Depends(require_admin)])
def write_catalog(payload: CatalogPayload, db: Session = Depends(get_db)) -> dict:
    try:
        return crud.replace_catalog(db, payload.products, payload.newArrivalIds)
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Duplicate product id") from exc


@app.post("/api/catalog/reset", response_model=CatalogOut, dependencies=[Depends(require_admin)])
def reset_catalog(db: Session = Depends(get_db)) -> dict:
    return crud.reset_catalog(db)


@app.get("/api/products", response_model=list[ProductOut])
def read_products(db: Session = Depends(get_db)) -> list[dict]:
    return crud.get_catalog(db)["products"]


@app.get("/api/products/{product_id}", response_model=ProductOut)
def read_product(product_id: str, db: Session = Depends(get_db)) -> dict:
    product = db.get(models.Product, product_id)

    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    return crud.product_to_dict(product)


@app.put("/api/products/{product_id}", response_model=ProductOut, dependencies=[Depends(require_admin)])
def write_product(product_id: str, payload: ProductPayload, db: Session = Depends(get_db)) -> dict:
    existing_product = db.get(models.Product, payload.id)

    if existing_product is not None and payload.id != product_id:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Product id already exists")

    product = crud.upsert_product(db, payload, product_id)
    db.commit()
    db.refresh(product)
    return crud.product_to_dict(product)


@app.delete("/api/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin)])
def delete_product(product_id: str, db: Session = Depends(get_db)) -> Response:
    product = db.get(models.Product, product_id)

    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")

    db.delete(product)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.put("/api/new-arrivals", response_model=CatalogOut, dependencies=[Depends(require_admin)])
def write_new_arrivals(payload: NewArrivalPayload, db: Session = Depends(get_db)) -> dict:
    crud.replace_new_arrivals(db, payload.newArrivalIds)
    db.commit()
    return crud.get_catalog(db)