import React from "react";
import PropTypes from "prop-types";
import instagramLogo from "../images/logos/instagram.svg";
import { graphql, useStaticQuery } from "gatsby";
import Image from "gatsby-image";
const getImage = graphql`
  {
    defaultImage: file(relativePath: { eq: "members-default-thumbnail.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;
const memberCard = ({ name, image, sentence, instagram }) => {
  const defaultImage = useStaticQuery(getImage);
  let imageElement = (
    <Image
      fluid={defaultImage.defaultImage.childImageSharp.fluid}
      className="block rounded-lg w-full "
    />
  );
  if (image) {
    imageElement = (
      <img
        src={`${image}?fit=crop&w=480&h=480`}
        className="block rounded-lg w-full "
      />
    );
  }

  let instagramElement = "";
  if (instagram) {
    instagramElement = (
      <a href={`https://www.instagram.com/${instagram}/`}>
        <img className="pj-button-icon block p-2 mt-3" src={instagramLogo} />
      </a>
    );
  }

  return (
    <div className="md:flex pj-img-outer p-4 mx-auto md:w-4/5 w-11/12 mt-8">
      <div className="md:w-1/5 w-1/2  mx-auto">
        {imageElement}
        {instagramElement}
      </div>
      <div className="md:w-4/5  md:ml-3 w-11/12 mx-auto ">
        <p className="font-display text-xl tracking-widest  text-center md:text-left">
          {name}
        </p>
        <p className="text-left text-sm">{sentence}</p>
      </div>
    </div>
  );
};
memberCard.propTypes = {
  name: PropTypes.any,
  image: PropTypes.any,
  sentence: PropTypes.any,
  instagram: PropTypes.any,
};

export default memberCard;
