import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

import { loadBlogPost } from "@/helpers/file-helpers";

import { MDXRemote } from "next-mdx-remote/rsc";

import CodeSnippet from "@/components/CodeSnippet";

import { Code } from "bright";

import DivisionGroupsDemo from "@/components/DivisionGroupsDemo";

export async function generateMetadata({ params: { postSlug } }) {
  const blogPost = await loadBlogPost(postSlug);

  const blog = blogPost.frontmatter;

  const content = blogPost.content;

  return {
    title: `${postSlug}`,
    description: `${blog.abstract}`,
  };
}

async function BlogPost({ params: { postSlug } }) {
  const blogPost = await loadBlogPost(postSlug);
  console.log(
    "🚀 ~ file: page.js:28 ~ BlogPost ~ blogPost:",
    blogPost.publishedOn
  );

  const blog = blogPost.frontmatter;

  const content = blogPost.content;

  return (
    <article className={styles.wrapper}>
      {/* <BlogHero title={blog.title} publishedOn={blog.publishedOn} /> */}
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo: DivisionGroupsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
