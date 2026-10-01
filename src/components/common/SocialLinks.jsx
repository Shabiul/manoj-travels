import { cn } from "@/lib/utils";

// No verified social profiles have been supplied yet — pass `links` in when
// they are, e.g. [{ label: "Instagram", href: "https://instagram.com/..." }].
// Nothing is fabricated or rendered until real links exist.
export function SocialLinks({ links = [], className }) {
  if (!links.length) return null;

  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={`Follow Manoj Tours and Travels on ${link.label}`}
            className="text-sm text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-text-on-dark)]"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
