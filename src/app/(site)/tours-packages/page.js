import { PageHero } from "@/components/common/PageHero";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { ToursPackagesExplorer } from "@/components/tours/ToursPackagesExplorer";
import { getTourPackages } from "@/lib/siteContent";
import { buildMetadata } from "@/lib/metadata";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Tours & Packages", href: "/tours-packages" },
];

export const metadata = buildMetadata({
  title: "Tours & Packages from Bangalore",
  description:
    "Round trip tour packages from Bangalore with Manoj Tours and Travels — Coorg, Munnar, Ooty, Chikmagalur, Goa, Gokarna, Sakleshpur, Kodaikanal, Pondicherry, Wayanad, Hampi, Tirupati and more.",
  path: "/tours-packages",
  image: "/images/destinations/coorg.png",
  keywords: [
    "bangalore to coorg tour package",
    "bangalore to munnar tour package",
    "bangalore to ooty tour package",
    "bangalore to goa tour package",
    "bangalore tour packages",
  ],
});

export const revalidate = 60;

export default async function ToursPackagesPage() {
  const packages = await getTourPackages();

  return (
    <>
      <PageHero


        eyebrow="Tours & Packages"
        title="Tour packages from Bangalore"
        description="Handpicked round-trip tour packages to Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, Puducherry and Goa."
        image="/images/destinations/coorg.png"
        imageAlt="Coorg tour package from Bangalore"
      />
      <Section tone="paper">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tours & Packages", href: "/tours-packages" }]} />
        <div className="mt-10">
          {packages.length === 0 ? (
            <p className="text-[16px] text-[var(--color-text-muted)]">No packages available right now — please check back soon.</p>
          ) : (
            <ToursPackagesExplorer packages={packages} />
          )}
        </div>
      </Section>
    </>
  );
}
