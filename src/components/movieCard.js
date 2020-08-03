import React from "react";
import PropTypes from "prop-types";
const memberCard = ({ title, youtubeId, sentence }) => {
  return (
    <div className="mt-8">
      <div className="pj-title-underber  w-1/6"></div>
      <h2 className="text-center font-display text-xl tracking-widest mt-6">
        {title}
      </h2>
      <p className="mt-4 text-sm">{sentence}</p>
      <p>インクリメンタルビルドのテストやで</p>
      <div className="pj-img-outer p-3 my-4">
        <div className="relative pj-youtube">
          <iframe
            width="100%"
            height="auto"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-0  left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
memberCard.propTypes = {
  title: PropTypes.any,
  youtubeId: PropTypes.any,
  sentence: PropTypes.any,
};

export default memberCard;
