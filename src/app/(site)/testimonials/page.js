import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ReviewSchema } from "@/components/seo/ReviewSchema";

import { TestimonialBook } from "@/components/testimonials/TestimonialBook";
import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/metadata";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Testimonials", href: "/testimonials" },
];

export const metadata = buildMetadata({
  title: "Customer Reviews & Testimonials — Manoj Tours and Travels",
  description:
    "Read real traveler reviews and feedback from passengers who booked local, outstation and airport cabs with Manoj Tours and Travels Bangalore.",
  path: "/testimonials",
  image: "/images/destinations/sakleshpura.png",
});

export default function TestimonialsPage() {
  return (
    <>
      <ReviewSchema testimonials={testimonials} />

      <PageHero
        eyebrow="From the Road"
        title="Travellers' Notes"
        description="Stories from the road, page by page."
        image="/images/destinations/sakleshpura.png"
        imageAlt="Sakleshpur"
      />
      <Section tone="sand">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mt-10">
          <TestimonialBook />
        </div>
      </Section>
    </>
  );
}

