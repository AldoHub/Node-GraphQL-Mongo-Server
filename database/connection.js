const data = require("./credentials");

module.exports = {
   connection: "mongodb://"+ data.username  +":"+ data.password +"@ds049456.mlab.com:49456/mongotest"
}

//this is the connection to the database, in mLab
//remember not to use this, save the variables in an .env file