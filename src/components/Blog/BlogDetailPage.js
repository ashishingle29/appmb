"use client";
import React from "react";

function BlogDetailPage({ blog }) {
  return (
    <>
      <div
        className="col-span-12 lg:col-span-8 font-in prose sm:prose-base md:prose-lg max-w-max
        prose-blockquote:bg-accent/20 
        prose-blockquote:p-2
        prose-blockquote:px-6
        prose-blockquote:border-accent
        prose-blockquote:not-italic
        prose-blockquote:rounded-r-lg
        prose-figure:relative
        prose-figcaption:mt-1
        prose-figcaption:mb-2
        prose-li:marker:text-accent
        dark:prose-invert
        dark:prose-blockquote:border-accentDark
        dark:prose-blockquote:bg-accentDark/20
        dark:prose-li:marker:text-accentDark
        first-letter:text-3xl
        sm:first-letter:text-5xl"
      >
        {/* Blog Title */}
        {blog?.title && (
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        )}

        {/* Featured Image */}
        {blog?.featuredImage && (
          <img
            src={blog.featuredImage}
            alt={blog.title || "Featured Image"}
            className="w-full h-auto rounded-lg mb-6"
            loading="lazy"
          />
        )}

        {blog?.content?.blocks.map((block) => {
          switch (block.type) {
            case "header":
              const HeadingTag = `h${block.data.level}`;
              return (
                <HeadingTag key={block.id} id={block.id}>
                  {block.data.text}
                </HeadingTag>
              );

            case "paragraph":
              return (
                <p
                  key={block.id}
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                />
              );

            case "quote":
              return (
                <blockquote key={block.id}>
                  {block.data.text}
                  {block.data.caption && <cite>{block.data.caption}</cite>}
                </blockquote>
              );

            case "code":
              return (
                <pre key={block.id}>
                  <code>{block.data.code}</code>
                </pre>
              );

            case "button":
              return (
                <a
                  key={block.id}
                  href={block.data.link}
                  className="inline-block bg-accent text-white px-4 py-2 rounded-md hover:bg-accent/90"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {block.data.text}
                </a>
              );

            case "list":
              return block.data.style === "ordered" ? (
                <ol key={block.id}>
                  {block.data.items.map((item, index) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item?.content }}
                    />
                  ))}
                </ol>
              ) : (
                <ul key={block.id}>
                  {block.data.items.map((item, index) => (
                    <li
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item?.content }}
                    />
                  ))}
                </ul>
              );

            // case "image":
            //   return (
            //     <figure key={block.id}>
            //       <img
            //         src={block.data.file.url}
            //         alt={block.data.caption || "Image"}
            //         className="w-full h-auto"
            //         loading="lazy"
            //       />
            //       {block.data.caption && <figcaption>{block.data.caption}</figcaption>}
            //     </figure>
            //   );
            case "image":
              return (
                <figure
                  key={block.id}
                  className={` 
                ${
                  block.data.withBorder
                    ? "border border-gray-300 rounded-lg"
                    : ""
                } 
                ${block.data.withBackground ? "bg-gray-100" : ""} 
                mx-auto w-full max-w-[600px]
            `}
                >
                  <img
                    src={block.data.file.url}
                    alt={block.data.caption || blog?.title}
                    className="h-auto w-full rounded-lg"
                    loading="lazy"
                  />
                  {block.data.caption && (
                    <figcaption className="text-center text-sm mt-2">
                      {block.data.caption}
                    </figcaption>
                  )}
                </figure>
              );

            case "table":
              return (
                <table key={block.id}>
                  <tbody>
                    {block.data.content.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              );

            case "linkTool":
              return (
                <a
                  key={block.id}
                  href={block.data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:text-accentDark"
                >
                  {block.data.meta.title}
                </a>
              );

            case "embed":
              return (
                <div key={block.id} className="relative overflow-hidden">
                  <iframe
                    src={block.data.embed}
                    title={block.data.caption || "Embedded content"}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full aspect-video"
                  />
                  {block.data.caption && <p>{block.data.caption}</p>}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </>
  );
}

export default BlogDetailPage;
