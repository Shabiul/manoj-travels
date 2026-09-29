import { notFound } from "next/navigation";
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
      <ArticleSchema title={post.title} description={post.excerpt} image={post.image} slug={post.slug} />
      <Breadcrumbs items={breadcrumbItems} />


      <div className="mx-auto mt-8 max-w-3xl">
        <Reveal>
          <h1 className="font-display text-3xl text-[var(--color-ink)] md:text-4xl">{post.title}</h1>
          <div className="relative mt-6 h-64 overflow-hidden rounded-[var(--radius-lg)] md:h-96">
            <Image src={post.image} alt={post.title} wrapperClassName="h-full" />
          </div>
          <div className="prose-content mt-8 space-y-5">
            {post.content.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-[var(--color-text-muted)]">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        {relatedService && (
          <div className="mt-12">
            <ServiceCTA service={relatedService} />
          </div>
        )}
      </div>
    </Section>
  );
}
