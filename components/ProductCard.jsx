import Link from "next/link";
import Button from "./Button";
import { formatCurrency } from "../data/products";
import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/products/${product.id}`} className="block bg-slate-100">
        <img
          src={product.image}
          alt={`${product.name} placeholder`}
          className="aspect-square w-full object-contain bg-white p-3 transition duration-300 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay-700">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`} className="mt-2">
          <h3 className="text-lg font-semibold text-slate-950">{product.name}</h3>
        </Link>
        <p className="mt-2 text-base font-bold text-leaf-800">{formatCurrency(product.price)}</p>
        <Button className="mt-5 w-full" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
