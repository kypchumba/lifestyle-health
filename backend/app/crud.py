from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import NewArrival, Product
from .schemas import ProductPayload
from .seed_data import DEFAULT_NEW_ARRIVAL_IDS, DEFAULT_PRODUCTS


def product_to_dict(product: Product) -> dict:
    return {
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "oldPrice": product.old_price,
        "image": product.image,
        "category": product.category,
        "description": product.description,
    }


def get_catalog(db: Session) -> dict:
    products = db.scalars(select(Product).order_by(Product.created_at.asc(), Product.name.asc())).all()
    new_arrivals = db.scalars(select(NewArrival).order_by(NewArrival.position.asc())).all()

    return {
        "products": [product_to_dict(product) for product in products],
        "newArrivalIds": [item.product_id for item in new_arrivals],
    }


def upsert_product(db: Session, payload: ProductPayload, original_id: str | None = None) -> Product:
    product_id = original_id or payload.id
    product = db.get(Product, product_id)

    if product is None:
        product = Product(id=payload.id)
        db.add(product)
    elif payload.id != product.id:
        db.query(NewArrival).filter(NewArrival.product_id == product.id).update(
            {NewArrival.product_id: payload.id}, synchronize_session=False
        )
        product.id = payload.id

    product.name = payload.name
    product.price = payload.price
    product.old_price = payload.oldPrice
    product.image = payload.image or "/stock.jpg"
    product.category = payload.category
    product.description = payload.description
    return product


def replace_new_arrivals(db: Session, new_arrival_ids: list[str]) -> None:
    valid_product_ids = {product_id for (product_id,) in db.query(Product.id).all()}
    db.query(NewArrival).delete()

    unique_ids = []
    for product_id in new_arrival_ids:
        if product_id in valid_product_ids and product_id not in unique_ids:
            unique_ids.append(product_id)

    for position, product_id in enumerate(unique_ids):
        db.add(NewArrival(product_id=product_id, position=position))


def replace_catalog(db: Session, products: list[ProductPayload], new_arrival_ids: list[str]) -> dict:
    incoming_ids = [product.id for product in products]

    if incoming_ids:
        db.query(NewArrival).filter(~NewArrival.product_id.in_(incoming_ids)).delete(
            synchronize_session=False
        )
        db.query(Product).filter(~Product.id.in_(incoming_ids)).delete(synchronize_session=False)
    else:
        db.query(NewArrival).delete()
        db.query(Product).delete()

    for product in products:
        upsert_product(db, product, product.id)

    db.flush()
    replace_new_arrivals(db, new_arrival_ids)
    db.commit()
    return get_catalog(db)


def seed_catalog_if_empty(db: Session) -> None:
    has_products = db.scalar(select(Product.id).limit(1))

    if has_products:
        return

    for product in DEFAULT_PRODUCTS:
        upsert_product(db, ProductPayload(**product), product["id"])

    db.flush()
    replace_new_arrivals(db, DEFAULT_NEW_ARRIVAL_IDS)
    db.commit()


def reset_catalog(db: Session) -> dict:
    db.query(NewArrival).delete()
    db.query(Product).delete()
    db.flush()

    for product in DEFAULT_PRODUCTS:
        upsert_product(db, ProductPayload(**product), product["id"])

    db.flush()
    replace_new_arrivals(db, DEFAULT_NEW_ARRIVAL_IDS)
    db.commit()
    return get_catalog(db)