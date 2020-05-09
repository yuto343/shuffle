const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: `Shuffle Snowboarding`,
    description: `同志社大学を拠点に活動するスノーボードサークル「shuffle」の公式ウェブサイトです。`,
    author: `@Yuto-Nakano`,
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `starter`,
        start_url: `/`,
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.teal["400"],
        display: `minimal-ui`,
        icon: `src/images/img/shufflenewlogo-white.png`,
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
        name: "image",
        path: `${__dirname}/src/images/img`,
      },
    },
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: "a95ec86f-842b-4f7c-8d0c-f5d641d3da43",
        serviceId: "shuffle",
        endpoint: "lead-members",
      },
    },
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: "a95ec86f-842b-4f7c-8d0c-f5d641d3da43",
        serviceId: "shuffle",
        endpoint: "season-movies",
      },
    },
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: "a95ec86f-842b-4f7c-8d0c-f5d641d3da43",
        serviceId: "shuffle",
        endpoint: "blogs",
      },
    },
  ],
};
