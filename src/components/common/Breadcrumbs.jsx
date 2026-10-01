import Link from "next/link";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

/** items: [{ label, href }] — href omitted/ignored on the final (current) item. */
export function Breadcrumbs({ items }) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className="text-[15px]">
        <ol className="flex flex-wrap items-center gap-2 text-[var(--color-text-muted)]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {isLast ? (
                  <span aria-current="page" className="text-[var(--color-ink)]">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} title={`Navigate to ${item.label}`} className="hover:text-[var(--color-ink)]">
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
