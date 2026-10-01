import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "ads.txt");
  let content = "";

  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    const pubId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "pub-10846077480";
    content = `# Authorized Digital Sellers (ads.txt)\ncontact=mailto:manojtaxiservice29@gmail.com\nsubdomain=manojtoursandtravels.in\ngoogle.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "all",
    },
  });
}
