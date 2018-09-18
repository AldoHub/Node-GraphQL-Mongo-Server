
  module.exports = `
    type Post { _id: String,
                name: String,
                description: String }

    type Query {
      posts: [Post!]!
      post(_id: String!): Post!
      }
    
    type Mutation {
      createPost(name: String!, description: String!): Post
      updatePost(_id: String, newName: String!, newDescription: String!): Post
      deleteUser(_id: String!): String
    }
  `;
  