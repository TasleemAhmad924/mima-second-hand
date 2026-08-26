"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/config/navigation";
import { isActivePath } from "@/lib/nav";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

/** Links shown as text in the desktop bar (the CTA covers "Regal mieten"). */
const desktopNav = primaryNav.filter((item) => item.href !== "/regal-mieten");

function MenuToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Menü schließen" : "Menü öffnen"}
      className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center text-charcoal lg:hidden"
    >
      <span className="relative block h-3 w-6" aria-hidden="true">
        <span
          className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 [transition-timing-function:var(--ease-inout)] ${
            open ? "translate-y-[5.5px] rotate-45" : ""
          }`}
        />
        <span
          className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 [transition-timing-function:var(--ease-inout)] ${
            open ? "-translate-y-[5.5px] -rotate-45" : ""
          }`}
        />
      </span>
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[70] bg-warm transition-[border-color,padding] duration-500 [transition-timing-function:var(--ease-editorial)] ${
        scrolled && !menuOpen ? "border-b border-line" : "border-b border-transparent"
      }`}
      style={{ paddingRight: "var(--scrollbar-compensation, 0px)" }}
    >
      <Container className="relative z-[70] flex items-center justify-between gap-6 py-3 lg:py-3.5">
        <Logo priority width={112} />

        <nav
          className="hidden items-center gap-9 lg:flex"
          aria-label="Hauptnavigation"
        >
          {desktopNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-underline text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                  active ? "text-charcoal" : "text-muted hover:text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <span className="hidden lg:inline-flex">
            <Button href="/regal-mieten">Regal mieten</Button>
          </span>
          <MenuToggle open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
