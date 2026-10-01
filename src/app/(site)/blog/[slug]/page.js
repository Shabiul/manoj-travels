import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
  });
}

export default function BlogPostPage({ params }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedService = post.relatedServiceSlug ? getServiceBySlug(post.relatedServiceSlug) : null;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Travel Guides", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <Section tone="paper" className="pt-36 md:pt-44">
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        image={post.image}
        slug={post.slug}
        datePublished={post.datePublished}
        dateModified={post.dateModified}
        authorName={post.author}
        authorRole={post.authorRole}
      />
      <Breadcrumbs items={breadcrumbItems} />

      <article className="mx-auto mt-8 max-w-3xl">
        <Reveal>
          <header>
            <h1 className="font-display text-3xl font-semibold leading-tight text-[var(--color-ink)] md:text-4xl">
              {post.title}
            </h1>

            {/* Author Byline & Machine-Readable Freshness Dates for E-E-A-T */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-[var(--color-line)] py-3.5 text-xs text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-ink)] font-display text-xs font-bold text-[var(--color-accent-soft)]">
                  MK
                </span>
                <div>
                  <span className="font-semibold text-[var(--color-ink)]">
                    <Link href="/about#founder" title="View founder profile of Manoj Kumar" className="hover:underline">
                      {post.author || "Manoj Kumar"}
                    </Link>
                  </span>
                  <span className="text-[var(--color-text-muted)]"> · {post.authorRole || "Route Operations Specialist"}</span>
                </div>
              </div>
              <span className="hidden sm:inline">•</span>
              <div>
                Published:{" "}
                <time dateTime={post.datePublished} className="font-medium text-[var(--color-ink)]">
                  {new Date(post.datePublished).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              <span>•</span>
              <div>
                Updated:{" "}
                <time dateTime={post.dateModified} className="font-medium text-[var(--color-ink)]">
                  {new Date(post.dateModified).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>
          </header>

          <div className="relative mt-6 h-64 overflow-hidden rounded-[var(--radius-lg)] md:h-96">
            <Image src={post.image} alt={post.title} title={post.title} wrapperClassName="h-full" />
          </div>

          {/* Answer-First Structure: Inverted-Pyramid Quick Answer Box */}
          {post.directAnswer && (
            <div className="mt-8 rounded-[var(--radius-md)] border-l-4 border-[var(--color-accent)] bg-[var(--color-sand)] p-5 shadow-[var(--shadow-soft)]">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-strong,#b84000)]">
                Direct Answer / Key Takeaway
              </p>
              <p className="mt-2 text-base font-medium leading-relaxed text-[var(--color-ink)]">
                {post.directAnswer}
              </p>
            </div>
          )}

          {/* Core Body Content */}
          <div className="prose-content mt-8 space-y-5">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-[var(--color-text-muted)]">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Authority Quotation with Verified Attribution */}
          {post.quote && (
            <blockquote className="my-8 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-paper)] p-6 italic shadow-[var(--shadow-soft)]">
              <p className="text-base font-medium leading-relaxed text-[var(--color-ink)]">
                &ldquo;{post.quote.text}&rdquo;
              </p>
              <footer className="mt-3 not-italic text-sm font-semibold text-[var(--color-accent-strong,#b84000)]">
                — {post.quote.author}, <span className="font-normal text-[var(--color-text-muted)]">{post.quote.title}</span>
              </footer>
            </blockquote>
          )}

          {/* Named Regulatory & Industry Authority Citations with Outbound Links */}
          {post.authorityCitations?.length > 0 && (
            <section className="mt-10 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-sand)]/60 p-6">
              <h2 className="font-display text-lg font-semibold text-[var(--color-ink)]">
                Official Sources &amp; Regulatory References
              </h2>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Our pricing, permit details, and highway travel policies are verified against published government transport standards:
              </p>
              <ul className="mt-4 space-y-3">
                {post.authorityCitations.map((citation, idx) => (
                  <li key={idx} className="text-sm">
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Visit official source: ${citation.sourceName}`}
                      className="font-medium text-[var(--color-accent)] underline decoration-[var(--color-accent)]/40 underline-offset-2 hover:text-[var(--color-accent-strong,#b84000)]"
                    >
                      {citation.sourceName} ↗
                    </a>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                      {citation.context}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Reveal>

        {relatedService && (
          <div className="mt-12">
            <ServiceCTA service={relatedService} />
          </div>
        )}
      </article>
    </Section>
  );
}
