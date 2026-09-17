"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/config/navigation";
import { isActivePath } from "@/lib/nav";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { BookingCta } from "@/components/booking/BookingCta";
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
      className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center text-charcoal xl:hidden"
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

  return (
    <header
      className="sticky top-0 z-[70] border-b border-line bg-warm"
      style={{ paddingRight: "var(--scrollbar-compensation, 0px)" }}
    >
      <Container className="relative z-[70] flex items-center justify-between gap-4 py-2 lg:gap-6 lg:py-2.5">
        <Logo priority width={96} />

        <nav
          className="hidden items-center gap-5 xl:flex xl:gap-8"
          aria-label="Hauptnavigation"
        >
          {desktopNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`link-underline text-[0.7rem] font-medium uppercase tracking-[0.13em] transition-colors duration-300 ${
                  active ? "text-charcoal" : "text-muted hover:text-charcoal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <span className="hidden shrink-0 xl:inline-flex">
            <BookingCta
              mode="link"
              className="whitespace-nowrap px-5 tracking-[0.12em]"
            />
          </span>
          <MenuToggle open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
