// import { blogs as allBlogs } from "@/.velite/generated";
// import BlogLayoutThree from "@/src/components/Blog/BlogLayoutThree";
// import Categories from "@/src/components/Blog/Categories";
// import { slug } from "github-slugger";

// // const slugger = new GithubSlugger();

// // export async function generateStaticParams() {
// //   const categories = [];
// //   const paths = [{ slug: "all" }];

// //   allBlogs.map((blog) => {
// //     if (blog.isPublished) {
// //       blog.tags.map((tag) => {
// //         let slugified = slug(tag);
// //         if (!categories.includes(slugified)) {
// //           categories.push(slugified);
// //           paths.push({ slug: slugified });
// //         }
// //       });
// //     }
// //   });

// //   return paths;
// // }

// // export async function generateMetadata({ params }) {
// //   return {
// //     title: `${params.slug.replaceAll("-"," ")} Blogs`,
// //     description: `Learn more about ${params.slug === "all" ? "Latest Updates" : params.slug} through our collection of expert blogs and tutorials`,
// //   };
// // }


// const CategoryPage = async ({ params }) => {
// // Separating logic to create list of categories from all blogs
// const allCategories = ["all"]; // Initialize with 'all' category
// // allBlogs.forEach(blog => {
// //   blog.tags.forEach(tag => {
// //     const slugified = slug(tag);
// //     if (!allCategories.includes(slugified)) {
// //       allCategories.push(slugified);
// //     }
// //   });
// // });

// const getCategory = await fetch("/api/categories");
// const allCat = getCategory.json();

// console.log(allCat, "allCat")

// allCategories.push(allCat);
// // Step 2: Filter blogs based on the current category (params.slug)
// const allBlogs = await fetch("/api/posts");
// const blogs = allBlogs.json();

// console.log(blogs, "allblogs")
//   return (
//     <article className="mt-12 flex flex-col text-dark dark:text-light">
//       <div className=" px-5 sm:px-10  md:px-24  sxl:px-32 flex flex-col">
//         <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">#{params.slug}</h1>
//         <span className="mt-2 inline-block">
//           Discover more categories and expand your knowledge!
//         </span>
//       </div>

//       <Categories categories={allCategories} currentSlug={params?.slug} />

//       <div className="grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 grid-rows-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
//         {blogs.map((blog, index) => (
//           <article key={index} className="col-span-1 row-span-1 relative">
//             <BlogLayoutThree blog={blog} />
//           </article>
//         ))}
//       </div>
//     </article>
//   );
// };

// export default CategoryPage;


import BlogLayoutThree from "@/src/components/Blog/BlogLayoutThree";
import Categories from "@/src/components/Blog/Categories";
import siteMetadata from "@/src/utils/siteMetaData";

const TagPage = async ({ params }) => {
  const { slug } = params;

  // Fetch all categories
  const getCategory = await fetch(`${siteMetadata?.siteUrl}/api/tags`);
  const allCat = await getCategory.json();

  // Include "all" category by default
  const allCategories = [{name : "all", slug: "all"}, ...allCat.map((cat) => cat)];


  console.log(allCategories, "allCategories")
  // Fetch blogs based on category slug
  const getBlogs = await fetch(
    `${siteMetadata?.siteUrl}/api/posts?tag=${slug}`
  );
  const blogs = await getBlogs.json();
  console.log(blogs, "getBlogs")

  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          #{slug?.replaceAll("-", " ")}
        </h1>
        <span className="mt-2 inline-block">
          Discover more categories and expand your knowledge!
        </span>
      </div>

      {/* Render categories */}
      <Categories categories={allCategories} currentSlug={slug} module="tags"/>

      {/* Render blog posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {blogs.map((blog) => (
          <article key={blog._id} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </article>
  );
};

export async function generateStaticParams() {
  // Fetch categories from API
  const res = await fetch(`${siteMetadata?.siteUrl}/api/categories`);
  const categories = await res.json();

  const paths = [{ slug: "all" }, ...categories.map((cat) => ({ slug: cat.slug }))];

  return paths;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  
  return {
    title: `${slug.replaceAll("-", " ")} Blogs`,
    description: `Learn more about ${
      slug === "all" ? "Latest Updates" : slug.replaceAll("-", " ")
    } through our collection of expert blogs and tutorials.`,
  };
}

export default TagPage;
