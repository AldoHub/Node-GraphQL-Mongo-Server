const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // an ID
    name: {type: String, required: true}, // a String , which is required
    description: {type: String, required: true},  //also a required String
  
});


//create and export the model
module.exports = mongoose.model("Post", postSchema);

//this is a simple Mongoose Model