export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://appmb.org.in";

  const robots = `
      User-agent: *
      Allow: /
  
      Sitemap: ${BASE_URL}/sitemap.xml
    `;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
