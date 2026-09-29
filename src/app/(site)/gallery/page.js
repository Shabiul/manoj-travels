import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { PageHero } from "@/components/common/PageHero";

import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { galleryItems } from "@/data/gallery";
import { buildMetadata } from "@/lib/metadata";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
];

export const metadata = buildMetadata({
  title: "Photo Gallery — Manoj Tours & Travels Fleet and Tours",
  description:
    "Explore photos of our well-maintained cabs and glimpses of top destinations across Karnataka, Tamil Nadu, Kerala and Andhra Pradesh.",
  path: "/gallery",
  image: "/images/destinations/chikamangaluru.png",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero

        eyebrow="Gallery"
        title="On the road with Manoj Tours & Travels"
        description="A few real glimpses of our fleet in service and the destinations we cover."
        image="/images/destinations/chikamangaluru.png"
        imageAlt="Chikmagaluru"
      />
      <Section tone="paper">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mt-10">
        <GalleryGrid items={galleryItems} />
      </div>
      </Section>
    </>
  );
}
