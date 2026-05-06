from pydantic import BaseModel, ConfigDict, Field


class ProductPayload(BaseModel):
    id: str = Field(min_length=1, max_length=160)
    name: str = Field(min_length=1, max_length=255)
    price: int = Field(default=0, ge=0)
    oldPrice: int = Field(default=0, ge=0)
    image: str = Field(default="/stock.jpg", max_length=500)
    category: str = Field(min_length=1, max_length=160)
    description: str = ""


class ProductOut(ProductPayload):
    model_config = ConfigDict(from_attributes=True)


class CatalogPayload(BaseModel):
    products: list[ProductPayload]
    newArrivalIds: list[str] = []


class CatalogOut(BaseModel):
    products: list[ProductOut]
    newArrivalIds: list[str]


class LoginPayload(BaseModel):
    username: str
    password: str


class LoginOut(BaseModel):
    accessToken: str
    tokenType: str = "bearer"


class NewArrivalPayload(BaseModel):
    newArrivalIds: list[str]