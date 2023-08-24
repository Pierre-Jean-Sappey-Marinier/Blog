import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";

import { getBlogPostList } from "@/helpers/file-helpers";

async function Home() {
  const blogPosts = await getBlogPostList();
  console.log("🚀 ~ file: page.js:11 ~ Home ~ blogPosts:", blogPosts);
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {blogPosts.map((item, index) => {
        return (
          <BlogSummaryCard
            key={index}
            slug={item.slug}
            title={item.title}
            abstract={item.abstract}
            publishedOn={item.publishedOn}
          />
        );
      })}
    </div>
  );
}

export default Home;
