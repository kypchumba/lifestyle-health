import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { useCart } from "./CartContext";

const links = [
  { href: "/#home", label: "Home", sectionId: "home" },
  { href: "/#about", label: "About", sectionId: "about" },
  { href: "/#services", label: "Services", sectionId: "services" },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
  { href: "/products", label: "Shop" },
];

const sectionIds = links.filter((link) => link.sectionId).map((link) => link.sectionId);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter();
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    if (router.pathname !== "/" || typeof window === "undefined") {
      return undefined;
    }

    function updateActiveSection() {
      let currentSection = "home";

      sectionIds.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (section && section.getBoundingClientRect().top <= 140) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [router.pathname]);

  function handleSectionClick(event, link) {
    setIsMenuOpen(false);

    if (!link.sectionId || router.pathname !== "/") {
      return;
    }

    const section = document.getElementById(link.sectionId);

    if (!section) {
      return;
    }

    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(link.sectionId);
    router.replace(link.href, undefined, { shallow: true, scroll: false });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <Link
          href="/#home"
          scroll={false}
          onClick={(event) => handleSectionClick(event, links[0])}
          className="flex items-center"
          aria-label="Go to home page"
        >
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

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = link.sectionId
              ? router.pathname === "/" && activeSection === link.sectionId
              : router.pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                scroll={false}
                onClick={(event) => handleSectionClick(event, link)}
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

        <div className="hidden items-center gap-3 md:flex">
          <Button href="/admin" variant="ghost" className="px-4">Admin</Button>
          <Button variant="secondary" onClick={openCart} className="px-4">Cart ({itemCount})</Button>
          <Button href="/products">Shop Now</Button>
        </div>

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

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                scroll={false}
                onClick={(event) => handleSectionClick(event, link)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-leaf-50 hover:text-leaf-800"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-leaf-50 hover:text-leaf-800"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
