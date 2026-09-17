import type {
  LegalBlock,
  LegalDocumentData,
  LegalSection,
} from "@/lib/legal/types";

interface LegalDocumentProps {
  document: LegalDocumentData;
}

export function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <article className="text-[0.975rem] leading-[1.65] text-muted sm:text-base">
      <header className="border-b border-line pb-8 sm:pb-10">
        <address className="not-italic text-charcoal">
          <p className="font-display text-xl text-charcoal">{document.party.name}</p>
          <p className="mt-3">{document.party.street}</p>
          <p>
            {document.party.postalCode} {document.party.city}
          </p>
          <p className="mt-3">
            {document.party.ownerLabel}: {document.party.ownerName}
          </p>
          <p>{document.party.legalForm}</p>
          <p>
            E-Mail:{" "}
            <a
              href={`mailto:${document.party.email}`}
              className="link-underline text-charcoal"
            >
              {document.party.email}
            </a>
          </p>
          <p>
            Website:{" "}
            <a
              href={document.party.websiteHref}
              className="link-underline text-charcoal"
            >
              {document.party.websiteLabel}
            </a>
          </p>
        </address>
        <p className="mt-6 text-sm text-muted">Stand: {document.published}</p>
      </header>

      <LegalToc sections={document.sections} />

      <div>
        {document.sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>

      <footer className="border-t border-line pt-8 sm:pt-10">
        {document.closing.map((line) => (
          <p key={line} className="text-charcoal">
            {line}
          </p>
        ))}
      </footer>
    </article>
  );
}

export function PrivacyDocument({
  sections,
  source,
}: {
  sections: LegalSection[];
  source: { label: string; href: string };
}) {
  return (
    <article className="text-[0.975rem] leading-[1.65] text-muted sm:text-base">
      <LegalToc sections={sections} />

      <div>
        {sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>

      <footer className="border-t border-line pt-8 sm:pt-10">
        <p>
          Quelle:{" "}
          <LegalAnchor href={source.href}>{source.label}</LegalAnchor>
        </p>
      </footer>
    </article>
  );
}

function LegalToc({ sections }: { sections: LegalSection[] }) {
  return (
    <nav aria-label="Inhalt" className="border-b border-line py-8 sm:py-10">
      <p className="eyebrow">Inhalt</p>
      <ol className="mt-5 columns-1 gap-x-12 sm:columns-2">
        {sections.map((section) => (
          <li key={section.id} className="break-inside-avoid pb-1.5">
            <a
              href={`#${section.id}`}
              className="text-sm leading-snug text-charcoal transition-colors duration-300 hover:text-taupe-ink"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Section({ section }: { section: LegalSection }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-24 border-b border-line py-8 last:border-b-0 sm:py-10"
    >
      <h2 className="font-display text-[1.35rem] leading-tight text-charcoal sm:text-[1.55rem]">
        {section.title}
      </h2>
      <div className="mt-5 space-y-4">
        {section.blocks.map((block, index) => (
          <Block key={`${section.id}-${index}`} block={block} />
        ))}
      </div>
    </section>
  );
}

function LegalAnchor({ href, children }: { href: string; children: string }) {
  const external = href.startsWith("http://") || href.startsWith("https://");

  return (
    <a
      href={href}
      className="link-underline break-all text-charcoal"
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "h3") {
    return (
      <h3 className="pt-2 font-display text-[1.15rem] text-charcoal">
        {block.text}
      </h3>
    );
  }

  if (block.type === "p" || block.type === "lead") {
    return <p className="whitespace-pre-line">{block.text}</p>;
  }

  if (block.type === "formula") {
    return (
      <p className="font-display text-[1.05rem] text-charcoal">{block.text}</p>
    );
  }

  if (block.type === "caps") {
    return (
      <p className="text-[0.92rem] leading-[1.7] text-charcoal sm:text-[0.95rem]">
        {block.text}
      </p>
    );
  }

  if (block.type === "link") {
    return (
      <p>
        <LegalAnchor href={block.href}>{block.label}</LegalAnchor>
      </p>
    );
  }

  if (block.type === "rich") {
    return (
      <p className="whitespace-pre-line">
        {block.parts.map((part, index) =>
          part.href ? (
            <LegalAnchor key={`${part.text}-${index}`} href={part.href}>
              {part.text}
            </LegalAnchor>
          ) : (
            <span key={`${part.text}-${index}`}>{part.text}</span>
          ),
        )}
      </p>
    );
  }

  if (block.type === "ul") {
    return (
      <ul className="space-y-1.5 pl-0">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-taupe" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ol className="space-y-3">
      {block.items.map((item, index) => (
        <li key={item.text} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2">
          <span className="tabular-nums text-taupe-ink">{index + 1}.</span>
          <div>
            <p>{item.text}</p>
            {item.aside ? (
              <p className="mt-2 font-display text-[1.05rem] text-charcoal">
                {item.aside}
              </p>
            ) : null}
            {item.bullets ? (
              <ul className="mt-2 space-y-1.5">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-3 shrink-0 bg-taupe"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
