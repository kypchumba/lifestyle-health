import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import { useCart } from "../../components/CartContext";
import ProductCard from "../../components/ProductCard";
import { useProductCatalog } from "../../components/ProductCatalogContext";
import SectionWrapper from "../../components/SectionWrapper";
import { formatCurrency, products as defaultProducts } from "../../data/products";

export default function ProductDetailsPage({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { products, isCatalogReady } = useProductCatalog();
  const router = useRouter();
  const productId = router.query.id;
  const catalogProduct = products.find((item) => item.id === productId);
  const currentProduct = catalogProduct || product;

  const relatedProducts = currentProduct
    ? products
        .filter((item) => item.category === currentProduct.category && item.id !== currentProduct.id)
        .slice(0, 4)
    : [];

  function handleBack() {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/products");
  }

  if (!currentProduct) {
    return (
      <>
        <Head>
          <title>Product details | Wellness E-commerce Frontend</title>
        </Head>
        <button
          type="button"
          onClick={handleBack}
          className="fixed bottom-5 left-5 z-30 rounded-full border border-leaf-200 bg-white px-4 py-3 text-sm font-semibold text-leaf-900 shadow-2xl transition hover:-translate-y-1 hover:bg-leaf-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-700 focus-visible:ring-offset-2"
        >
          Back
        </button>
        <SectionWrapper className="bg-white">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
              Product details
            </p>
            <h1 className="mt-3 text-3xl font-bold text-slate-950">
              {isCatalogReady ? "Product not found" : "Loading product"}
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {isCatalogReady
                ? "This product is not available in the current catalog."
                : "Checking the saved admin catalog for this product."}
            </p>
            <Button href="/products" className="mt-6">
              Back to shop
            </Button>
          </div>
        </SectionWrapper>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{currentProduct.name} | Wellness E-commerce Frontend</title>
        <meta name="description" content={currentProduct.description} />
      </Head>

      <button
        type="button"
        onClick={handleBack}
        className="fixed bottom-5 left-5 z-30 rounded-full border border-leaf-200 bg-white px-4 py-3 text-sm font-semibold text-leaf-900 shadow-2xl transition hover:-translate-y-1 hover:bg-leaf-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-700 focus-visible:ring-offset-2"
      >
        Back
      </button>

      <SectionWrapper className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-soft">
            <img
              src={currentProduct.image}
              alt={`${currentProduct.name} placeholder`}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="lg:pt-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
              {currentProduct.category}
            </p>
            <h1 className="mt-4 text-4xl font-bold text-slate-950">{currentProduct.name}</h1>
            <p className="mt-4 text-2xl font-bold text-leaf-800">{formatCurrency(currentProduct.price)}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              {currentProduct.description}
            </p>

            <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-slate-950">Quantity</p>
                <div className="mt-3 inline-flex items-center rounded-full border border-slate-300 bg-white">
                  <button
                    type="button"
                    className="px-4 py-2 text-xl text-slate-700"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  >
                    -
                  </button>
                  <span className="min-w-10 text-center font-semibold">{quantity}</span>
                  <button
                    type="button"
                    className="px-4 py-2 text-xl text-slate-700"
                    onClick={() => setQuantity((current) => current + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <Button className="w-full sm:w-auto" onClick={() => addToCart(currentProduct, quantity)}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {relatedProducts.length > 0 && (
        <SectionWrapper className="bg-slate-50">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
              Related products
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">More from this category</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: defaultProducts.map((product) => ({ params: { id: product.id } })),
    fallback: "blocking",
  };
}

export function getStaticProps({ params }) {
  const product = defaultProducts.find((item) => item.id === params.id) || null;

  return {
    props: {
      product,
    },
  };
}