const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMicrocmsBlogs {
          edges {
            node {
              createdAt
              blogsId
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMicrocmsBlogs.edges.forEach((post, index) => {
    createPage({
      path: `blogs/${post.node.blogsId}`,
      component: path.resolve("./src/templates/blogPost.js"),
      context: {
        slug: post.node.blogsId,
      },
    });
  });
};
