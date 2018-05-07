var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var user_schema = new Schema({
 name: String,
 email:String,
 password:String
});

// the schema is useless so far
// we need to create a model using it
var eventOrg = mongoose.model('user', user_schema);
//var orgs=mongoose.model('org',orgSchema);
//connect with database
mongoose.connect('mongodb://localhost:27017/mydb');
// make this available to our users in our Node applications
module.exports = eventOrg;
//module.exports=orgs;