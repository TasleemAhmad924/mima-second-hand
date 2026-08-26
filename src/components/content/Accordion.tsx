"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/types";

interface AccordionProps {
  items: Pick<FaqItem, "question" | "answer">[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <AccordionItem key={item.question} item={item} />
      ))}
    </div>
  );
}

function AccordionItem({ item }: { item: Pick<FaqItem, "question" | "answer"> }) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const buttonId = `${baseId}-button`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className="flex w-full items-start justify-between gap-6 py-5 text-left sm:items-center sm:py-6"
        >
          <span className="font-display text-[1.05rem] leading-snug text-charcoal sm:text-xl">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className="relative mt-1.5 h-3.5 w-3.5 shrink-0 text-taupe-ink sm:mt-0"
          >
            <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
            <span
              className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 origin-center bg-current transition-transform duration-300 [transition-timing-function:var(--ease-inout)] ${
                open ? "rotate-90 scale-y-0" : "rotate-0 scale-y-100"
              }`}
            />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open || undefined}
        className={`grid transition-[grid-template-rows] duration-300 [transition-timing-function:var(--ease-inout)] ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 pr-8 text-[0.95rem] leading-relaxed text-muted sm:pb-7 sm:text-base">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
