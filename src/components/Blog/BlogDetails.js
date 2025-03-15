import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import ViewCounter from "./ViewCounter";

const BlogDetails = ({ blog, slug }) => {
  return (
    <div className="px-2  md:px-10 bg-accent dark:bg-accentDark text-light dark:text-dark py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5  md:mx-10 rounded-lg">
      <time className="m-3">
        LastUpdate: {format(parseISO(blog.updatedAt), "LLLL d, yyyy")}
      </time>
      <span className="m-3">
        {/* <ViewCounter slug={blogSlug} /> */}
        Category: <Link href={`/categories/${blog?.category?.slug}`}>{blog?.category?.name}</Link>
      </span>
      <div className="m-3">Reading Time: {blog.readingTime || "2 min"}</div>
      <div>
        Tags:
        {blog?.tags?.map((tag, index) => (
          <Link key={tag?._id} href={`/tags/${tag?.slug}`} className="m-3">
            #{tag?.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
