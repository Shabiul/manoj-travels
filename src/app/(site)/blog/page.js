import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Reveal";
import { blogPosts } from "@/data/blog";
import { buildMetadata } from "@/lib/metadata";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Travel Guides", href: "/blog" },
];

export const metadata = buildMetadata({
  title: "Bangalore Taxi & Outstation Travel Guides",
  description:
    "Practical guides on booking one way cabs, round trips, local hourly packages and Kempegowda airport transfers with Manoj Tours and Travels Bangalore.",
  path: "/blog",
  image: blogPosts[0]?.image,
});

export default function BlogPage() {
  return (
    <Section tone="paper" className="pt-36 md:pt-44">
      <Breadcrumbs items={breadcrumbItems} />


      <SectionHeading
        as="h1"
        className="mt-6"
        eyebrow="Travel Guides"
        title="Practical guides for planning your trip"
        description="Straightforward guides on how our services and pricing work."
      />
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <Reveal key={post.slug} delay={(index % 3) * 90}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-line)] bg-[var(--color-paper)] shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative h-44">
                <Image
                  src={post.image}
                  alt={post.title}
                  wrapperClassName="h-44"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                  <span>By {post.author || "Manoj Kumar"}</span>
                  <span>•</span>
                  <time dateTime={post.dateModified || post.datePublished}>
                    {new Date(post.dateModified || post.datePublished).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </>
                  )}
                </div>
                <h2 className="mt-2 font-display text-lg text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{post.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
