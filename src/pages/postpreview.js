import React, { useState, useEffect } from "react";
import { getSearchParams } from "gatsby-query-params";
import PageLayout from "../components/pageLayout";
import PageTitle from "../components/pageTitle";
import SEO from "../components/seo";

function postpreview() {
  const queryParams = getSearchParams();
  const contentId = queryParams.contentId;
  const draftKey = queryParams.draftKey;
  let [postData, setPostData] = useState(null);
  console.log(queryParams);
  console.log(contentId);
  const formatDay = function (date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}.${month}.${day}`;
  };
  useEffect(() => {
    if (!postData) {
      fetch(
        `https://shuffle-snow.microcms.io/api/v1/blogs/${contentId}?draftKey=${draftKey}`,
        {
          headers: {
            "X-API-KEY": "10073370-360b-4b5a-927a-ad8f9bb33b40",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((json) => {
          postData = setPostData(json);
        });
    } else {
      return function cleanup() {
        console.log("done");
      };
    }
  });
  return (
    <PageLayout>
      <PageTitle title="blogs" />
      <SEO
        keywords={[`同志社大学`, `サークル`, `スノーボード`]}
        title={postData ? postData.title : ""}
        image={postData ? postData.thumbnail.url : false}
      />
      <div className="md:w-4/5 w-full pj-img-outer mx-auto mt-8 bg-gray-800 pj-post-sentence">
        {postData ? (
          <img
            src={postData.thumbnail.url}
            className="rounded-t  block"
            alt="blogthumbnail"
          />
        ) : (
          <div className="pt-1"></div>
        )}

        {/* <img src={postData.thumbnail.url} className="rounded-t  block" /> */}
        <h1 className="text-xl mt-8 py-2 font-bold text-left px-4">
          {postData ? postData.title : ""}
        </h1>
        <time className="font-display block mt-4 text-xl tracking-wider text-white">
          {formatDay(postData ? postData.createdAt : "")}
        </time>
        <div
          className="mt-4 mx-6 text-left pb-10 "
          dangerouslySetInnerHTML={{
            __html: postData ? postData.sentence : "",
          }}
        ></div>
      </div>
    </PageLayout>
  );
}

export default postpreview;
