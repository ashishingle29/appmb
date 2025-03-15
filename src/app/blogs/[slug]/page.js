// import BlogDetails from "@/src/components/Blog/BlogDetails";
// import RenderMdx from "@/src/components/Blog/RenderMdx";
// import Tag from "@/src/components/Elements/Tag";
// import siteMetadata from "@/src/utils/siteMetaData";
// import { slug as slugify } from "github-slugger";
// import Image from "next/image";
// import { notFound } from "next/navigation";

// const API_URL = `/api/posts`;

// export async function generateStaticParams() {
//   try {
//     const res = await fetch(API_URL);
//     if (!res.ok) throw new Error("Failed to fetch blog data");
//     const blogs = await res.json();
//     return blogs.map((blog) => ({ slug: blog.slug }));
//   } catch (error) {
//     console.error("Failed to generate static params:", error);
//     return [];
//   }
// }

// export async function generateMetadata({ params }) {
//   try {
//     const { slug } = params;
//     const res = await fetch(`${API_URL}/${slug}`);
//     if (!res.ok) return;

//     const blog = await res.json();
//     if (!blog) return;

//     const createdAt = new Date(blog.createdAt).toISOString();
//     const modifiedAt = new Date(blog.updatedAt || blog.createdAt).toISOString();

//     let imageList = [siteMetadata.siteLogo];
//     if (blog.featuredImage) {
//       imageList = [blog.featuredImage];
//     }

//     const ogImages = imageList.map((img) => ({
//       url: img.includes("http") ? img : siteMetadata.siteUrl + img,
//     }));

//     const authors = blog?.author ? [blog.author] : [siteMetadata.author];

//     return {
//       title: blog.title,
//       description: blog.metadescription,
//       openGraph: {
//         title: blog.title,
//         description: blog.metadescription,
//         url: `${siteMetadata.siteUrl}/blogs/${blog.slug}`,
//         siteName: siteMetadata.title,
//         locale: "en_US",
//         type: "article",
//         publishedTime: createdAt,
//         modifiedTime: modifiedAt,
//         images: ogImages,
//         authors,
//       },
//       twitter: {
//         card: "summary_large_image",
//         title: blog.title,
//         description: blog.metadescription,
//         images: ogImages,
//       },
//     };
//   } catch (error) {
//     console.error("Failed to generate metadata:", error);
//     return {};
//   }
// }

// function TableOfContentsItem({ item, level = "two" }) {
//   return (
//     <li className="py-1">
//       <a
//         href={item.url}
//         data-level={level}
//         className="data-[level=two]:pl-0 data-[level=two]:pt-2 border-t border-dark/40 data-[level=three]:pl-4 sm:data-[level=three]:pl-6 flex items-center"
//       >
//         {level === "three" && (
//           <span className="flex w-1 h-1 rounded-full bg-dark mr-2"></span>
//         )}
//         <span className="hover:underline">{item.title}</span>
//       </a>
//       {item.items?.length > 0 && (
//         <ul className="mt-1">
//           {item.items.map((subItem) => (
//             <TableOfContentsItem
//               key={subItem.url}
//               item={subItem}
//               level="three"
//             />
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// }

// export default async function BlogPage({ params }) {
//   const { slug } = params;

//   let blog;
//   try {
//     const res = await fetch(`${API_URL}/${slug}`);
//     if (!res.ok) notFound();
//     blog = await res.json();
//   } catch (error) {
//     console.error("Failed to fetch blog data:", error);
//     notFound();
//   }

//   let imageList = [siteMetadata.socialBanner];
//   if (blog.image) {
//     imageList =
//       typeof blog.image.src === "string"
//         ? [siteMetadata.siteUrl + blog.image.src]
//         : blog.image;
//   }

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "NewsArticle",
//     headline: blog.title,
//     description: blog.description,
//     image: imageList,
//     datePublished: new Date(blog.createdAt).toISOString(),
//     dateModified: new Date(blog.updatedAt || blog.createdAt).toISOString(),
//     author: [
//       {
//         "@type": "Person",
//         name: blog.author || siteMetadata.author,
//         url: siteMetadata.twitter,
//       },
//     ],
//   };

//   return (
//     <>
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <article>
//         <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
//           <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//             {blog?.category?.map((cat) => (
//               <Tag
//                 name={cat}
//                 link={`/tags/${cat}`}
//                 className="px-6 text-sm py-2"
//               />
//             ))}
//             <h1 className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl">
//               {blog.title}
//             </h1>
//           </div>
//           <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60" />
//           <Image
//             src={blog.featuredImage}
//             placeholder="blur"
//             blurDataURL={blog.featuredImage}
//             alt={blog.title}
//             width={100}
//             height={100}
//             className="aspect-square w-full h-full object-cover"
//             priority
//           />
//         </div>

//         <BlogDetails blog={blog} slug={slug} />

//         <div className="grid grid-cols-12 gap-y-8 lg:gap-8 mt-8 px-5 md:px-10">
//           <div className="col-span-12 lg:col-span-4">
//             <details
//               className="border-[1px] border-dark text-dark rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
//               open
//             >
//               <summary className="text-lg font-semibold capitalize cursor-pointer">
//                 Table Of Content
//               </summary>
//               <ul className="mt-4 font-in text-base">
//                 {/* {blog.toc.map((item) => ( */}
//                 {[].map((item) => (
//                   <TableOfContentsItem key={item.url} item={item} />
//                 ))}
//               </ul>
//             </details>
//           </div>
//           {/* <RenderMdx blog={blog} /> */}
//         </div>
//       </article>
//     </>
//   );
// }
"use client";
import BlogDetails from "@/src/components/Blog/BlogDetails";
import siteMetadata from "@/src/utils/siteMetaData";
import Image from "next/image";
import Tag from "@/src/components/Elements/Tag";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BlogDetailPage from "@/src/components/Blog/BlogDetailPage";
import Loader from "@/src/components/Loader";
const API_URL = `/api/posts`;

function Page({ params }) {
  const [blog, setBlog] = useState(null);
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    async function unwrapParams() {
      const unwrappedParams = await params;
      setSlug(unwrappedParams.slug);
    }
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    async function fetchBlog() {
      try {
        const res = await fetch(`${API_URL}/${slug}`);
        if (!res.ok) notFound();
        const getblogDetails = await res.json();
        setBlog(getblogDetails);
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
        notFound();
      }
    }
    fetchBlog();
  }, [slug]);

  let imageList = [siteMetadata.socialBanner];
  if (blog?.featuredImage) {
    imageList =
      typeof blog.featuredImage === "string"
        ? [siteMetadata.siteUrl + blog.featuredImage]
        : blog.featuredImage;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog?.title,
    description: blog?.metaDescription,
    image: imageList,
    datePublished: blog ? new Date(blog.createdAt).toISOString() : "",
    dateModified: blog
      ? new Date(blog.updatedAt || blog.createdAt).toISOString()
      : "",
    author: [
      {
        "@type": "Person",
        name: blog?.author || siteMetadata.author,
        url: siteMetadata.whatsappChannel,
      },
    ],
  };

  if (!blog) return <Loader size="md" />;

  console.log(blog, "blogdata");

  function generateTOC(contentBlocks) {
    return contentBlocks
      .filter((block) => block?.type === "header")
      .map((header) => ({
        id: header.id,
        title: header.data.text,
        url: `#${header.id}`,
        level: header.data.level,
      }));
  }

  function TableOfContentsItem({ item }) {
    return (
      <li className="py-1">
        <a
          href={item.url}
          data-level={item.level}
          className={`data-[level='2']:pl-0 data-[level='2']:pt-2 border-t border-dark/40 dark:border-light/20 ${
            item.level === 3 ? "pl-4 sm:pl-6" : ""
          } flex items-center dark:text-light`}
        >
          {item.level === 3 && (
            <span className="flex w-1 h-1 rounded-full bg-dark dark:bg-light mr-2"></span>
          )}
          <span className="hover:underline">{item.title}</span>
        </a>
      </li>
    );
  }
  

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        {false && (
          <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
            <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link
                href={`/categories/${blog.category?.slug}`}
                className="px-6 text-sm py-2"
              >
                {blog.category?.name}
              </Link>
              {/* {blog?.category?.map((cat) => (
              <Tag
                name={cat}
                link={`/tags/${cat}`}
                className="px-6 text-sm py-2"
              />
            ))} */}
              <h1 className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl">
                {blog.title}
              </h1>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60" />
            <Image
              src={blog.featuredImage}
              placeholder="blur"
              blurDataURL={blog.featuredImage}
              alt={blog.title}
              width={100}
              height={100}
              className="aspect-square w-full h-full object-cover"
              priority
            />
          </div>
        )}
        <BlogDetails blog={blog} slug={slug} />

        {/* // Inside your component */}
        <div className="grid grid-cols-12 gap-y-8 lg:gap-8 mt-8 px-5 md:px-10">
          <div className="col-span-12 lg:col-span-4">
            <details
              className="border-[1px] border-dark text-dark bg-white rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto
               dark:border-accentDark dark:text-light dark:bg-dark"
              open
            >
              <summary className="text-lg font-semibold capitalize cursor-pointer dark:text-light">
                Table Of Content
              </summary>
              <ul className="mt-4 font-in text-base dark:text-light">
                {generateTOC(blog?.content?.blocks).map((item) => (
                  <TableOfContentsItem key={item.id} item={item} />
                ))}
              </ul>
            </details>
          </div>

          <BlogDetailPage blog={blog} />
        </div>
      </article>
    </>
  );
}

export default Page;
