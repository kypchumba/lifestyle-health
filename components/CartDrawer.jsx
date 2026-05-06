import Button from "./Button";
import { useCart } from "./CartContext";
import { formatCurrency } from "../data/products";

export default function CartDrawer() {
  const { cart, subtotal, isCartOpen, closeCart, updateQuantity, removeFromCart, clearCart } =
    useCart();

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-slate-950/35"
        onClick={closeCart}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-leaf-800">
              Your Cart
            </p>
            <h2 className="text-xl font-bold text-slate-950">Selected products</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {cart.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
              <p className="font-semibold text-slate-900">Your cart is empty.</p>
              <p className="mt-2 text-sm text-slate-600">Add a product to start a simple order.</p>
              <Button href="/products" className="mt-5" onClick={closeCart}>
                Browse Products
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-2xl border border-slate-200 p-3">
                  <img
                    src={item.image}
                    alt={`${item.name} placeholder`}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-950">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{formatCurrency(item.price)}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-full border border-slate-200">
                        <button
                          type="button"
                          className="px-3 py-1 text-lg text-slate-700"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1 text-lg text-slate-700"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-sm font-semibold text-red-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 p-5">
          <div className="mb-4 flex items-center justify-between text-base font-bold text-slate-950">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <Button className="w-full" disabled={cart.length === 0}>
            Checkout
          </Button>
          {cart.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full text-center text-sm font-semibold text-slate-500 hover:text-slate-900"
            >
              Clear cart
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
