import { NextResponse } from "next/server";
import { getAllPosts, getAllCategories, getAllTags } from "@/src/lib/data"; 

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://appmb.org.in";

export async function GET() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const tags = await getAllTags();

  // Generate sitemap header
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // ✅ 1. Home Page
  sitemap += `
    <url>
      <loc>${BASE_URL}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.00</priority>
    </url>
  `;

  // ✅ 2. Blog Posts
  posts.forEach((post) => {
    sitemap += `
      <url>
        <loc>${BASE_URL}/blogs/${post.slug}</loc>
        <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.90</priority>
        ${post.featuredImage ? `
          <image:image>
            <image:loc>${BASE_URL}${post.featuredImage}</image:loc>
            <image:title>${post.title}</image:title>
            <image:caption>${post.metadescription}</image:caption>
           </image:image>` : ''}
      </url>
    `;
  });

  // ✅ 3. Categories
  categories.forEach((category) => {
    sitemap += `
      <url>
        <loc>${BASE_URL}/categories/${category.slug}</loc>
        <lastmod>${new Date(category.updatedAt).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.80</priority>
        ${category.image ? `
          <image:image>
            <image:loc>${BASE_URL}${category.image}</image:loc>
            <image:title>${category.name}</image:title>
          </image:image>` : ''}
      </url>
    `;
  });

  // ✅ 4. Tags
  tags.forEach((tag) => {
    sitemap += `
      <url>
        <loc>${BASE_URL}/tags/${tag.slug}</loc>
        <lastmod>${new Date(tag.updatedAt).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.70</priority>
      </url>
    `;
  });

  sitemap += `</urlset>`;

  // ✅ Return XML Response
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
