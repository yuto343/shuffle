import React from "react";
import Image from "gatsby-image";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";

function ImageContainer({ imageUrl }) {
  const data = useStaticQuery(getAllImage).allFile.edges;

  const targetImage = data.find((image) => {
    return image.node.fields.link === imageUrl;
  });
  return (
    <div>
      <Image
        fluid={targetImage.node.childImageSharp.fluid}
        alt="natsugassyuku"
      />
    </div>
  );
}
export const getAllImage = graphql`
  {
    allFile(filter: { fields: { SampleImage: { eq: "true" } } }) {
      edges {
        node {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          fields {
            link
          }
        }
      }
    }
  }
`;
ImageContainer.propTypes = {
  imageUrl: PropTypes.string,
};
export default ImageContainer;
