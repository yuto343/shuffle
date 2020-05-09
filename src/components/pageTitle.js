import React from "react";
import PropTypes from "prop-types";
function PageTitle({ title }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-center mx-auto tracking-widest">
        {title}
      </h2>
      <div className="pj-title-underber  w-1/6 "></div>
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.node.isRequired,
};

export default PageTitle;
