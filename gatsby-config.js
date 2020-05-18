const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: `Shuffle Snowboarding`,
    description: `同志社大学を拠点に活動するスノーボードサークル「shuffle」の公式ウェブサイトです。`,
    author: `@Yuto-Nakano`,
    siteUrl: "https://shuffle-snowboarding.style",
    image: "src/images/elements/icon.png",
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `shuffle-snowboarding`,
        short_name: `shuffle`,
        start_url: `/`,
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.teal["400"],
        display: `minimal-ui`,
        icon: `src/images/elements/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "pictures",
        path: `${__dirname}/src/images/pictures`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "elements",
        path: `${__dirname}/src/images/elements`,
      },
    },
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: "10073370-360b-4b5a-927a-ad8f9bb33b40",
        serviceId: "shuffle-snow",
        endpoint: "lead-members",
      },
    },
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: "10073370-360b-4b5a-927a-ad8f9bb33b40",
        serviceId: "shuffle-snow",
        endpoint: "season-movies",
      },
    },
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: "10073370-360b-4b5a-927a-ad8f9bb33b40",
        serviceId: "shuffle-snow",
        endpoint: "blogs",
      },
    },
  ],
};
