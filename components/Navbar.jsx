import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { useCart } from "./CartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">

        {/* LOGO (BIG BUT NO LAYOUT BREAK) */}
        <Link href="/" className="flex items-center" aria-label="Go to home page">
          <div className="relative -my-4 flex items-center">
            <Image
              src="/logo.png"
              alt="Wellness Wave Logo"
              width={160}
              height={160}
              priority
              className="h-32 w-32 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? router.pathname === link.href
                : router.pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-leaf-100 text-leaf-800"
                    : "text-slate-600 hover:bg-leaf-50 hover:text-leaf-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="secondary" onClick={openCart} className="px-4">
            Cart ({itemCount})
          </Button>
          <Button href="/products">Shop Now</Button>
        </div>

        {/* MOBILE */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={openCart}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800"
          >
            Cart ({itemCount})
          </button>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-slate-200"
          >
            <span className="h-0.5 w-5 rounded-full bg-slate-900" />
            <span className="h-0.5 w-5 rounded-full bg-slate-900" />
            <span className="h-0.5 w-5 rounded-full bg-slate-900" />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-leaf-50 hover:text-leaf-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}