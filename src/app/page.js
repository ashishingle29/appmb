"use client";
// import { blogs } from "@/.velite/generated";
// import HomeCoverSection from "../components/Home/HomeCoverSection";
// import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const res = await fetch("/api/posts");
      const data = await res.json();
      console.log("data", data);
      setLoading(false);
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center">
      {loading ? (
        <Loader size="md" />
      ) : (
        <>
          <RecentPosts blogs={blogs} />
        </>
      )}
      {/* Uncomment the following lines to include these components */}
      {/* <HomeCoverSection blogs={blogs} /> */}
      {/* <FeaturedPosts blogs={blogs} /> */}
    </main>
  );
}
