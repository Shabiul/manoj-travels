import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { CallButton } from "@/components/common/CallButton";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { FareEstimator } from "@/components/common/FareEstimator";
import { ServiceCTA } from "@/components/services/ServiceCTA";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { getServiceBySlug } from "@/data/services";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
    type: "article",
  });
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  if (!post) notFound();

  const relatedService = post.relatedServiceSlug ? getServiceBySlug(post.relatedServiceSlug) : null;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Travel Guides", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ];

  const defaultDestination = post.slug.includes("mysore")
    ? "mysore"
    : post.slug.includes("mangalore")
    ? "mangalore"
    : "mysore";

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
      {post.faqs?.length > 0 && <FAQSchema faqs={post.faqs} />}
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

          {/* Answer-First Structure: Inverted-Pyramid Quick Answer Box with Speakable CSS selectors */}
          {post.directAnswer && (
            <div className="ai-citation-block direct-answer-text mt-8 rounded-[var(--radius-md)] border-l-4 border-[var(--color-accent)] bg-[var(--color-sand)] p-5 shadow-[var(--shadow-soft)]">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-strong,#b84000)]">
                  Direct Answer / Key Takeaway
                </p>
                <span className="rounded bg-[var(--color-ink)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-ink)] uppercase">
                  Verified Factual Standard
                </span>
              </div>
              <p className="mt-2 text-base font-medium leading-relaxed text-[var(--color-ink)]">
                {post.directAnswer}
              </p>
            </div>
          )}

          {/* Interactive Fare Estimator Widget (Enhancement 6: Dwell Time & Instant CRO) */}
          <div className="mt-8">
            <FareEstimator initialDestination={defaultDestination} />
          </div>

          {/* Quick CTA Strip for High-Intent Readers */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-sand)]/50 p-4 sm:p-5">
            <div>
              <p className="text-sm font-bold text-[var(--color-ink)]">
                Need an immediate outstation cab or enquiry?
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                24×7 dispatch across all Bangalore localities &amp; Airport.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <CallButton label="Call Driver Dispatch" />
              <WhatsAppButton label="WhatsApp Fares" />
            </div>
          </div>

          {/* Core Body Content — Simple Paragraphs Fallback */}
          {post.content?.length > 0 && (
            <div className="prose-content mt-8 space-y-5">
              {post.content.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed text-[var(--color-text-muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Structured Rich Sections (H2, H3, Tables, Lists, Callouts, Images) */}
          {post.sections?.length > 0 && (
            <div className="mt-10 space-y-12">
              {post.sections.map((section, sIdx) => {
                const HeadingTag = section.level === "h3" ? "h3" : "h2";
                const headingClass =
                  section.level === "h3"
                    ? "font-display text-xl sm:text-2xl font-semibold text-[var(--color-ink)] mt-8 mb-3"
                    : "font-display text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-ink)] mt-12 mb-4 border-b border-[var(--color-line)]/60 pb-3";

                return (
                  <section
                    key={sIdx}
                    id={section.id}
                    className={`scroll-mt-28 ${section.isAiCitation ? "ai-citation-block" : ""}`}
                  >
                    {section.heading && (
                      <HeadingTag className={headingClass}>
                        {section.heading}
                      </HeadingTag>
                    )}

                    {section.paragraphs?.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="mt-4 text-[16.5px] leading-relaxed text-[var(--color-text-muted)]"
                      >
                        {p}
                      </p>
                    ))}

                    {/* Driver Insider Tips (Enhancement 1: Information Gain Injection) */}
                    {section.insiderTips?.length > 0 && (
                      <div className="my-7 space-y-4">
                        {section.insiderTips.map((tip, tIdx) => (
                          <div
                            key={tIdx}
                            className="rounded-[var(--radius-md)] border-2 border-[var(--color-accent-soft,#e5c494)] bg-amber-50/70 p-5 shadow-sm"
                          >
                            <div className="flex items-center gap-2">
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent-strong,#b84000)] text-xs font-bold text-white">
                                💡
                              </span>
                              <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-accent-strong,#b84000)]">
                                {tip.badge || "Driver Insider Tip (Information Gain)"}
                              </span>
                            </div>
                            <h4 className="mt-2 font-display text-base sm:text-lg font-bold text-[var(--color-ink)]">
                              {tip.title}
                            </h4>
                            <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-[var(--color-text)]">
                              {tip.text}
                            </p>
                            {tip.author && (
                              <p className="mt-2 text-xs font-medium text-[var(--color-text-muted)]">
                                — {tip.author}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Customer Verified Review (Enhancement 5: Review Mining for AEO) */}
                    {section.reviewVerification && (
                      <div className="my-6 rounded-[var(--radius-md)] border border-emerald-300 bg-emerald-50/60 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-amber-500">
                            {"★".repeat(section.reviewVerification.stars || 5)}
                          </div>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                            ✓ Customer Verified Review
                          </span>
                        </div>
                        <p className="mt-3 text-base italic leading-relaxed text-[var(--color-ink)]">
                          &ldquo;{section.reviewVerification.quote}&rdquo;
                        </p>
                        <div className="mt-3 flex items-center justify-between border-t border-emerald-200/60 pt-2.5 text-xs text-[var(--color-text-muted)]">
                          <span className="font-semibold text-[var(--color-ink)]">
                            {section.reviewVerification.author}, {section.reviewVerification.location}
                          </span>
                          <span>Trip: {section.reviewVerification.trip}</span>
                        </div>
                      </div>
                    )}

                    {/* Rich Data / Pricing Table / Comparison Table */}
                    {section.table && (
                      <div className="my-6 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-line)] shadow-sm">
                        <table className="w-full min-w-[560px] text-left text-sm">
                          {section.table.caption && (
                            <caption className="bg-[var(--color-sand)] p-3 text-xs font-semibold text-[var(--color-text-muted)] text-left border-b border-[var(--color-line)]">
                              {section.table.caption}
                            </caption>
                          )}
                          <thead className="bg-[var(--color-ink)] text-[var(--color-text-on-dark)]">
                            <tr>
                              {section.table.headers.map((th, hIdx) => (
                                <th
                                  key={hIdx}
                                  className="px-4 py-3.5 font-semibold tracking-wide text-xs uppercase"
                                >
                                  {th}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--color-line)] bg-white/70">
                            {section.table.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className={rIdx % 2 === 0 ? "bg-transparent" : "bg-[var(--color-sand)]/30"}
                              >
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`px-4 py-3.5 text-sm ${
                                      cIdx === 0
                                        ? "font-semibold text-[var(--color-ink)]"
                                        : "text-[var(--color-text)]"
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Highlight Callout Box */}
                    {section.callout && (
                      <div className="my-6 rounded-[var(--radius-md)] border-l-4 border-[var(--color-accent-2)] bg-[var(--color-sand)] p-4 sm:p-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-2)]">
                          {section.callout.title || "Highway Travel Tip"}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink)]">
                          {section.callout.text}
                        </p>
                      </div>
                    )}

                    {/* Bullet List */}
                    {section.list?.length > 0 && (
                      <ul className="my-5 space-y-2.5 pl-2">
                        {section.list.map((item, lIdx) => (
                          <li
                            key={lIdx}
                            className="flex items-start gap-2.5 text-[15.5px] leading-relaxed text-[var(--color-text-muted)]"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                            <span>
                              {typeof item === "string" ? (
                                item
                              ) : (
                                <>
                                  <strong className="text-[var(--color-ink)]">
                                    {item.label}:{" "}
                                  </strong>
                                  {item.description}
                                </>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Sub-Images (e.g. vehicle fleet or attraction) */}
                    {section.image && (
                      <figure className="my-6 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-line)] bg-white">
                        <div className="relative h-56 sm:h-72 w-full">
                          <Image
                            src={section.image.src}
                            alt={section.image.alt}
                            title={section.image.title || section.image.alt}
                            wrapperClassName="h-full"
                          />
                        </div>
                        {section.image.caption && (
                          <figcaption className="bg-[var(--color-sand)]/70 px-4 py-2.5 text-center text-xs text-[var(--color-text-muted)]">
                            {section.image.caption}
                          </figcaption>
                        )}
                      </figure>
                    )}
                  </section>
                );
              })}
            </div>
          )}

          {/* Interactive FAQs Accordion */}
          {post.faqs?.length > 0 && (
            <section className="mt-14 border-t border-[var(--color-line)] pt-10">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink)]">
                Frequently Asked Questions
              </h2>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Everything you need to know about fares, tolls, bookings, and route logistics:
              </p>
              <div className="mt-6 space-y-4">
                {post.faqs.map((faq, fIdx) => (
                  <details
                    key={fIdx}
                    className="group rounded-[var(--radius-md)] border border-[var(--color-line)] bg-[var(--color-sand)]/40 p-4 open:bg-white transition-colors"
                  >
                    <summary className="cursor-pointer list-none font-display font-semibold text-[var(--color-ink)] flex items-center justify-between gap-3">
                      <span>{faq.question}</span>
                      <span className="shrink-0 text-[var(--color-accent)] transition-transform group-open:rotate-180">
                        ▾
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)] border-t border-[var(--color-line)]/50 pt-3">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

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
