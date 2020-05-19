import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

function SEO({ description, lang, meta, keywords, title, image }) {
  const { site } = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `);

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = "Shuffle-Snowboarding";
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      defaultTitle={defaultTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: `${title} | ${defaultTitle}` || defaultTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content:
            image ||
            `${site.siteMetadata.siteUrl}/members-default-thumbnail.jpg`,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: `${title} | ${defaultTitle}`,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  keywords: [],
  meta: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
  image: PropTypes.any,
};

export default SEO;
