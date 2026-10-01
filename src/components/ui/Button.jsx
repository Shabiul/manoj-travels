import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-sm)] font-semibold tracking-[-0.01em] transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:hover:translate-y-0";

const variants = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-text-on-dark)] hover:bg-[var(--color-ink-2)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]",
  accent:
    "bg-[var(--color-accent)] text-[var(--color-text-on-dark)] hover:bg-[var(--color-accent-2)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]",
  outline:
    "border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-2)] bg-transparent",
  "outline-dark":
    "border border-[var(--color-line-on-dark)] text-[var(--color-text-on-dark)] hover:border-[var(--color-accent-soft)] hover:text-[var(--color-accent-soft)] bg-transparent",
  glass:
    "glass-light text-[var(--color-ink)] hover:shadow-[var(--shadow-lift)]",
  ghost: "text-[var(--color-text)] hover:bg-[var(--color-paper-2)]",
  whatsapp: "glass-light text-[var(--color-ink)] hover:shadow-[var(--shadow-lift)]",
};

const sizes = {
  sm: "px-4 py-2.5 text-[17px]",
  md: "px-6 py-3.5 text-[17px] md:text-[18px]",
  lg: "px-8 py-[1.1rem] text-[17px] md:text-[18px]",
};

export function Button({
  as,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  title,
  ...props
}) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const buttonTitle =
    title ||
    (typeof children === "string" ? children : undefined) ||
    (href ? `Navigate to ${href}` : undefined);

  if (href) {
    const isExternal = /^https?:|^tel:|^mailto:/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          title={buttonTitle}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} title={buttonTitle} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const Tag = as || "button";
  return (
    <Tag className={classes} title={buttonTitle} {...props}>
      {children}
    </Tag>
  );
}
