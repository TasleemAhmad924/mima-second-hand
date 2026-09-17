"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { primaryNav, legalNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { isActivePath } from "@/lib/nav";
import { EASE_INOUT, EASE_OUT } from "@/lib/motion";
import { BookingCta } from "@/components/booking/BookingCta";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const menuNav = primaryNav.filter((item) => item.href !== "/regal-mieten");

function isVisible(el: HTMLElement) {
  if (el.getClientRects().length === 0) return false;
  const style = window.getComputedStyle(el);
  return style.visibility !== "hidden" && style.display !== "none";
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const previousPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${scrollbar}px`;
    }

    const focusTimer = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>("a[href]");
      first?.focus();
    }, 90);

    function focusables(): HTMLElement[] {
      const header = document.querySelector("header");
      const scopes = [panelRef.current, header].filter(Boolean) as HTMLElement[];
      const nodes: HTMLElement[] = [];
      for (const scope of scopes) {
        nodes.push(
          ...Array.from(
            scope.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          ),
        );
      }
      return nodes.filter(isVisible);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      document.body.style.paddingRight = previousPadding;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  // Panel clip + children settle under ~500ms; close mirrors open.
  const overlayVariants: Variants = reduceMotion
    ? {
        closed: { opacity: 0, transition: { duration: 0.14 } },
        open: { opacity: 1, transition: { duration: 0.18 } },
      }
    : {
        closed: {
          clipPath: "inset(0 0 100% 0)",
          transition: {
            duration: 0.34,
            ease: EASE_INOUT,
            when: "afterChildren",
            staggerChildren: 0.012,
            staggerDirection: -1,
          },
        },
        open: {
          clipPath: "inset(0 0 0% 0)",
          transition: {
            duration: 0.4,
            ease: EASE_INOUT,
            when: "beforeChildren",
            delayChildren: 0.06,
            staggerChildren: 0.045,
          },
        },
      };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: reduceMotion ? 0 : 12 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.38, ease: EASE_OUT },
    },
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-0 z-[60] bg-warm xl:hidden"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="flex h-dvh flex-col overflow-y-auto overscroll-contain px-5 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-[5.5rem] sm:px-8">
            <nav aria-label="Hauptnavigation">
              <ul className="flex flex-col">
                {menuNav.map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  const number = String(index + 1).padStart(2, "0");
                  return (
                    <motion.li key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className="group flex min-h-12 items-baseline gap-4 border-b border-line/60 py-3.5"
                      >
                        <span className="w-6 shrink-0 font-sans text-[0.62rem] uppercase tracking-[0.14em] text-taupe-ink">
                          {number}
                        </span>
                        <span
                          className={`font-display text-[clamp(1.55rem,1.15rem+2.1vw,2.15rem)] leading-[1.14] transition-colors duration-300 ${
                            active
                              ? "text-taupe-ink"
                              : "text-charcoal group-hover:text-taupe-ink"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-10 flex flex-1 flex-col">
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-x-5 gap-y-1"
              >
                {legalNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex min-h-11 items-center text-sm text-muted transition-colors duration-300 hover:text-charcoal"
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>

              <div className="mt-auto pt-8">
                <motion.div variants={itemVariants}>
                  <BookingCta mode="link" className="w-full sm:w-auto" onNavigate={onClose} />
                </motion.div>

                <motion.p variants={itemVariants} className="mt-4 text-sm text-muted">
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="link-underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
