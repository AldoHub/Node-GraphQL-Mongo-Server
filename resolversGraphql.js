const Mongoose= require("mongoose");

//resolvers will make the calls to the database
module.exports= {
    //make the queries, you can add multiple separated by a comma
    //all must be defined in the typeDefs file
    Query: {
        //we define a function for each definition
        //in this case I am using async and await
        posts: async (parent, args, {Post}) =>{
           //the code goes this way
           //we get the args, which is the request sent
           //and we need to add the Model for Mongo
           //in this case in args we receive the complete data

            const posts = await Post.find();
            //we wait for the response and return the posts
            return posts;
          
        },
        post: async (parent, {_id}, {Post}) => {
            //here args is just the _id
            const post = await Post.findById(_id);
            //we find the post by the ID and return that post
            return post;
        }
    },
    Mutation:{
        createPost: async (parent, args, {Post}) =>{
           
            //here we write to the database
            //we set the values
            //that we got in our Model
            //and get the properties inside args
            //like args.name
            const newPost =  await new Post({
                //we create here a new Mongo Id
                _id: new Mongoose.Types.ObjectId(),
                name: args.name,
                description: args.description
            });
            //we save
            newPost.save((err)=>{
              if(err)
              {  
                return err;
              }else{
                console.log("saved")
              }
            })
            //and return the post object
         return newPost
        },
        updatePost: async (parent, args, {Post}) =>{
            //this is the same
            //the diff is that here I am calling the properties using ["propertyName"]
            //we look for the file using the ID and update it
            const updatedPost = await Post.findByIdAndUpdate(args["_id"], {$set:{
                name: args["newName"],
                description: args["newDescription"]
            }}, (err, Post)=>{
                if(err){
                    console.log(err);
                }
            });
            return updatedPost;
        },
        deleteUser: async(parent, {_id}, {Post}) =>{
            //here we get the ID and delete a post
            //in this case we return a String
            const deletePost= await Post.remove({_id}, (err)=>{
                if(err){
                    console.log("There is no document with that ID");
                }
            });
           return "User has been deleted";
        }       
    }
};

