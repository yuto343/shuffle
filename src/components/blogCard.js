import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
const blogCard = ({ title, thumbnail, createdAt, blogsId }) => {
  const formatDay = function (date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}.${month}.${day}`;
  };
  return (
    <div className="md:w-3/5 w-11/12 mx-auto mt-8">
      <div className="pj-button">
        <Link to={`/blogs/${blogsId}`}>
          {thumbnail ? (
            <img
              className="rounded-t  block mx-auto"
              src={`${thumbnail}?fit=crop&w=800&h=400`}
              alt="blogthumbnail"
            />
          ) : (
            ""
          )}
          <time className="font-display text-right block p-2 tracking-wider">
            {formatDay(createdAt)}
          </time>
          <h2 className="p-2 font-bold text-lg">{title}</h2>
        </Link>
      </div>
    </div>
  );
};
blogCard.propTypes = {
  blogsId: PropTypes.any,
  title: PropTypes.any,
  thumbnail: PropTypes.any,
  createdAt: PropTypes.any,
};

export default blogCard;
