import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf-800 text-xs font-bold text-white">
              WW
            </span>
            <span className="font-bold text-slate-950">Logo Placeholder</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
            Placeholder wellness shop copy for a modern e-commerce experience focused on
            everyday rituals, thoughtful products, and convenient delivery.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm font-medium text-slate-700">
            <Link href="/">Home</Link>
            <Link href="/products">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Contact</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>Email: hello@example.com</p>
            <p>Phone: +254 700 000 000</p>
            <p>Location: City, Country</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs text-slate-500">
        Copyright {new Date().getFullYear()} Logo Placeholder. All rights reserved.
      </div>
    </footer>
  );
}
