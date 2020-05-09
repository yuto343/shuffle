import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import PageLayout from "../components/pageLayout";
import PageTitle from "../components/pageTitle";

const blogPost = ({ data }) => {
  const postData = data.microcmsBlogs;
  const formatDay = function (date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}.${month}.${day}`;
  };
  return (
    <PageLayout>
      <PageTitle title="blogs" />
      <div className="md:w-4/5 w-full pj-img-outer mx-auto mt-8 bg-gray-800 pj-post-sentence">
        {postData.thumbnail ? (
          <img src={postData.thumbnail.url} className="rounded-t  block" />
        ) : (
          <div className="pt-1"></div>
        )}

        {/* <img src={postData.thumbnail.url} className="rounded-t  block" /> */}
        <h1 className="text-xl mt-8 py-2 font-bold text-left px-4">
          {postData.title}
        </h1>
        <time className="font-display block mt-4 text-xl tracking-wider">
          {formatDay(postData.createdAt)}
        </time>
        <div
          className="mt-4 mx-6 text-left pb-10 "
          dangerouslySetInnerHTML={{ __html: postData.sentence }}
        ></div>
      </div>
    </PageLayout>
  );
};

export const query = graphql`
  query getSingleBlogPost($slug: String) {
    microcmsBlogs(blogsId: { eq: $slug }) {
      id
      sentence
      title
      createdAt
      thumbnail {
        url
      }
    }
  }
`;

blogPost.propTypes = {
  data: PropTypes.any,
};

export default blogPost;
