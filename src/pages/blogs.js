import React from "react";
import PageLayout from "../components/pageLayout";
import PageTitle from "../components/pageTitle";
import { useStaticQuery, graphql } from "gatsby";
import BlogCard from "../components/blogCard";
import SEO from "../components/seo";
const getData = graphql`
  {
    allMicrocmsBlogs {
      edges {
        node {
          createdAt
          sentence
          title
          thumbnail {
            url
          }
          blogsId
        }
      }
    }
  }
`;
function blogs() {
  const data = useStaticQuery(getData);
  const blogList = data.allMicrocmsBlogs.edges;
  return (
    <PageLayout>
      <SEO
        keywords={[`同志社大学`, `サークル`, `スノーボード`]}
        title="Blogs"
      />
      <PageTitle title="Blogs" />
      {blogList.map((d, idx) => {
        const hasThumbnail = d.node.thumbnail ? d.node.thumbnail.url : false;
        return (
          <BlogCard
            key={idx}
            title={d.node.title}
            thumbnail={hasThumbnail}
            createdAt={d.node.createdAt}
            blogsId={d.node.blogsId}
          />
        );
      })}
    </PageLayout>
  );
}

export default blogs;
