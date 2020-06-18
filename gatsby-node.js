const path = require(`path`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

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

  result.data.allMicrocmsBlogs.edges.forEach((post) => {
    createPage({
      path: `blogs/${post.node.blogsId}`,
      component: path.resolve("./src/templates/blogPost.js"),
      context: {
        slug: post.node.blogsId,
      },
    });
  });
};

// const sampleImageUrls = [
//   "https://images.microcms-assets.io/protected/ap-northeast-1:02b6cef8-4125-4ed5-9986-90167deebbd1/service/shuffle-snow/media/IMG_5798.jpg",
//   "https://images.microcms-assets.io/protected/ap-northeast-1:02b6cef8-4125-4ed5-9986-90167deebbd1/service/shuffle-snow/media/Screen%20Shot%202020-05-16%20at%2023.04.24.png",
//   "https://images.microcms-assets.io/protected/ap-northeast-1:02b6cef8-4125-4ed5-9986-90167deebbd1/service/shuffle-snow/media/hello-world.jpg",
// ];

// // sourceNodesにて外部画像のファイルノードを作成する
// exports.sourceNodes = async ({ actions, createNodeId, cache, store }) => {
//   // ここでは外部画像のURLの配列を処理するサンプルを示す
//   await Promise.all(
//     sampleImageUrls.map(async (sampleImageUrl) => {
//       // createRemoteFileNodeで外部の画像のファイルノードを作成する
//       const fileNode = await createRemoteFileNode({
//         url: sampleImageUrl,
//         cache,
//         store,
//         createNode: actions.createNode,
//         createNodeId: createNodeId,
//       });

//       // 他ファイルノードと区別するための識別子を付与
//       await actions.createNodeField({
//         node: fileNode,
//         name: "SampleImage",
//         value: "true",
//       });

//       // メタ情報として画像のURLを付与
//       await actions.createNodeField({
//         node: fileNode,
//         name: "link",
//         value: sampleImageUrl,
//       });

//       return fileNode;
//     })
//   );

//   /* (中略) */
// };

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  store,
  cache,
  createNodeId,
}) => {
  // console.log(node);
  // console.log(node.image);
  if (node.thumbnail) {
    const fileNode = await createRemoteFileNode({
      url: node.thumbnail.url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    });
    createNodeField({
      node: fileNode,
      name: "SampleImage",
      value: "true",
    });
    createNodeField({
      node: fileNode,
      name: "link",
      value: node.thumbnail.url,
    });
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id;
    }
  }
  // if (node.image) {
  //   let fileNode = await createRemoteFileNode({
  //     url: node.image.url, // string that points to the URL of the image
  //     parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
  //     createNode, // helper function in gatsby-node to generate the node
  //     createNodeId, // helper function in gatsby-node to generate the node id
  //     cache, // Gatsby's cache
  //     store, // Gatsby's redux store
  //   });
  //   createNodeField({
  //     node: fileNode,
  //     name: "SampleImage",
  //     value: "true",
  //   });
  //   createNodeField({
  //     node: fileNode,
  //     name: "link",
  //     value: node.image.url,
  //   });
  //   // if the file was created, attach the new node to the parent node
  //   if (fileNode) {
  //     node.featuredImg___NODE = fileNode.id;
  //   }
  // }
};
