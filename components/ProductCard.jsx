import Link from "next/link";
import Button from "./Button";
import { formatCurrency } from "../data/products";
import { useCart } from "./CartContext";

export default function ProductCard({ product, isNew }) {
  const { addToCart } = useCart();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white sm:rounded-2xl">
      {isNew && (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-red-200 px-2 py-1 text-[10px] font-semibold text-red-700 sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
          NEW
        </span>
      )}
      <Link href={`/products/${product.id}`} className="block bg-slate-100">
        <img
          src={product.image}
          alt={`${product.name} placeholder`}
          className="aspect-square w-full bg-white object-contain p-2 transition duration-300 group-hover:scale-[1.03] sm:p-3"
        />
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="text-[10px] font-semibold uppercase leading-4 tracking-[0.12em] text-clay-700 sm:text-xs sm:tracking-[0.16em]">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`} className="mt-2">
          <h3 className="break-words text-sm font-semibold leading-5 text-slate-950 sm:text-lg sm:leading-7">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-base font-bold text-green-600 sm:text-xl">
          {formatCurrency(product.price)}
        </p>

        {product.oldPrice && (
          <p className="text-xs font-medium text-red-500 line-through sm:text-sm">
            {formatCurrency(product.oldPrice)}
          </p>
        )}

        {product.oldPrice && (
          <span className="text-[10px] font-semibold text-green-600 sm:text-xs">
            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
          </span>
        )}

        <Button
          className="mt-auto w-full px-3 py-2 text-xs sm:mt-5 sm:px-5 sm:py-3 sm:text-sm"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
