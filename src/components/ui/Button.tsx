import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "on-dark" | "on-dark-outline";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-sm)] px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-[background-color,color,border-color] duration-[350ms] [transition-timing-function:var(--ease-inout)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-charcoal text-warm [@media(hover:hover)]:hover:bg-taupe-ink",
  secondary:
    "border border-line-strong text-charcoal [@media(hover:hover)]:hover:border-charcoal [@media(hover:hover)]:hover:bg-cream/60",
  "on-dark":
    "bg-warm text-charcoal [@media(hover:hover)]:hover:bg-taupe [@media(hover:hover)]:hover:text-charcoal",
  "on-dark-outline":
    "border border-warm/30 text-warm [@media(hover:hover)]:hover:border-warm [@media(hover:hover)]:hover:bg-warm/10",
};

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

type ActionButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export function Button(props: LinkButtonProps | ActionButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href !== undefined) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={props.onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const {
    children: _children,
    variant: _variant,
    className: _className,
    ...rest
  } = props;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
