import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-start">
            <Image
              src="/logo.png"
              alt="Wellness Wave Logo"
              width={160}
              height={160}
              priority
              className="h-auto w-64 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold uppercase tracking-[0.18em] text-green-400">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm font-medium text-blue-400">
            <Link href="/#home">Home</Link>
            <Link href="/products">Shop</Link>
            <Link href="/#about">About</Link>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold uppercase tracking-[0.18em] text-green-400">Contact</h3>
          <div className="mt-4 space-y-2 text-sm text-blue-400">
            <p>Email: chumbakenny@gmail.com</p>
            <p>Phone: +254 113 365 971</p>
            <p>Location: Nairobi, Kenya</p>
          </div>
        </div>

        <div className="md:col-start-2 md:col-end-4">
          <div className="mt-6 flex flex-wrap items-center gap-5">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/254113365971"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/whatsapp.png" alt="WhatsApp" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      WhatsApp
                    </span>
                  </a>
              
                  {/* Gmail */}
                  <a
                    href="mailto:chumbakenny@gmail.com"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/gmail.png" alt="Email" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      Email
                    </span>
                  </a>
              
                  {/* Instagram */}
                  <a
                    href="https://instagram.com/kypchumbaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/instagram.png" alt="Instagram" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      Instagram
                    </span>
                  </a>
              
                  {/* TikTok */}
                  <a
                    href="https://tiktok.com/@padri_gaming"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/tiktok.png" alt="TikTok" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      TikTok
                    </span>
                  </a>
              
                  {/* Facebook */}
                  <a
                    href="https://facebook.com/ken.orange.10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/facebook.png" alt="Facebook" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      Facebook
                    </span>
                  </a>
              
                  {/* Phone */}
                  <a
                    href="tel:+254113365971"
                    className="group relative transition-transform duration-300 hover:scale-110"
                  >
                    <img src="/phone.png" alt="Phone" className="h-8 w-8" />
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-slate-900 px-2 py-1 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                      Call
                    </span>
                  </a>
                 
          </div>
        </div>

      </div>
      <div className="border-t border-slate-200 px-4 py-5 text-center text-xs">
        Copyright {new Date().getFullYear()} Wellness Wave. All rights reserved.
      </div>
    </footer>
  );
}
