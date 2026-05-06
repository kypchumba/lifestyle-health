import Link from "next/link";
import Button from "./Button";
import { formatCurrency } from "../data/products";
import { useCart } from "./CartContext";

export default function ProductCard({ product, isNew }) {
  const { addToCart } = useCart();

  return (
    <article className="relative group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {isNew && (
        <span className="absolute left-3 top-3 rounded-full bg-red-200 px-3 py-1 text-xs font-semibold text-white-700">
          NEW
        </span>
      )}
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
          <p className="text-xl font-bold text-green-600">
            {formatCurrency(product.price)}
          </p>
        
          {product.oldPrice && (
            <p className="text-sm font-medium text-red-500 line-through">
              {formatCurrency(product.oldPrice)}
            </p>
          )}

          {product.oldPrice && (
            <span className="text-xs font-semibold text-green-600">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}

        <Button className="mt-5 w-full" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
