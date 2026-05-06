import Head from "next/head";
import { useState } from "react";
import Button from "../../components/Button";
import { useCart } from "../../components/CartContext";
import ProductCard from "../../components/ProductCard";
import SectionWrapper from "../../components/SectionWrapper";
import { formatCurrency, products } from "../../data/products";

export default function ProductDetailsPage({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Head>
        <title>{product.name} | Wellness E-commerce Frontend</title>
        <meta name="description" content={product.description} />
      </Head>

      <SectionWrapper className="bg-white">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-soft">
            <img
              src={product.image}
              alt={`${product.name} placeholder`}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="lg:pt-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-leaf-800">
              {product.category}
            </p>
            <h1 className="mt-4 text-4xl font-bold text-slate-950">{product.name}</h1>
            <p className="mt-4 text-2xl font-bold text-leaf-800">{formatCurrency(product.price)}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
              {product.description}
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
              <Button className="w-full sm:w-auto" onClick={() => addToCart(product, quantity)}>
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
    paths: products.map((product) => ({ params: { id: product.id } })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  const product = products.find((item) => item.id === params.id);

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product
    }
  };
}
