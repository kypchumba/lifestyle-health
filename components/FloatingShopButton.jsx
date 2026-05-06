import Link from "next/link";
import { useRouter } from "next/router";

export default function FloatingShopButton() {
  const router = useRouter();

  if (router.pathname.startsWith("/products") || router.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <Link
      href="/products"
      aria-label="Open shop"
      title="Open shop"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-leaf-200 bg-white shadow-2xl transition hover:-translate-y-1 hover:bg-leaf-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-700 focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <img src="/shop.png" alt="" className="h-8 w-8 object-contain sm:h-9 sm:w-9" />
    </Link>
  );
}
