const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
// need to install cors module
const cors = require("cors");

//---- This is an example, of a little API built with Node / Express / GraphQL (Apollo Server) / MongoDB


//import mongoose
const mongoose = require("mongoose");

//import the MongoDB model
const Post = require("./models/Post");


//import the connection
const database = require("./database/connection");

//definition  types for GraphQL queries
//this now is part of GraphQL
const typeDefs = require("./schemaGraphql");

//resolvers for graphql queries
//also this one
const resolvers = require("./resolversGraphql");


//connect to the database
mongoose.connect(
  database.connection)
.then(connection => {
  console.log("connection stablished")
})
.catch(error => {
  console.log(database);
  console.log({
      error : {
          name : error.name,
          message : error.message,
          errorCode: error.code,
          codeName: error.codeName
      }
  })
});

//this is how you would make a query in postman
//http://localhost:3000/graphql?query={posts{name}} ---- query example

// Put together a schema
//here we add the other parts to the Schema
//the definitions, in this example in String form
//and the resolvers
//the resolvers make the actual actions
//like queries and storing to database
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
  
// Initialize the app
const app = express();

//add cors so you can forward the call
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method");
  next();
});

// The GraphQL endpoint
// here we tell express what to use
//and we pass the schema, and the context, which in this case is the Post Model
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: {Post} }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(8000, () => {
  console.log('Go to http://localhost:3000/graphiql');
});

// this is it for this little code review, I will update the api later
//or make a more in-depth Code Review Later
// I hope this little Code Review helps you to understand GraphQL
//let me show you a little article

//tells you a little bit about how to make the HTTP request without the Client
//but later I will implement a Client GraphQL using Reactjs

//thats all for now