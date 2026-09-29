import { reviewListSchema } from "@/lib/structured-data";

export function ReviewSchema({ testimonials }) {
  if (!testimonials?.length) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewListSchema(testimonials)) }}
    />
  );
}
