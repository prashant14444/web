var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var user_schema = new Schema({
 name: String,
 email:String,
 job_title:String,
 job_area:String,
 phone_number:String,
 age: Number,
 address:String,
 city:String,
 religion:String,
 caste:String,
 state: String,
 sex:String,
 company_name:String,
 image:String,
 username:String,
 profile_visibility: String,
 email_visibilty:String,
 my_followers:Array,
 following:Array
});

// the schema is useless so far
// we need to create a model using it
var eventOrg = mongoose.model('user_data', user_schema);
//var orgs=mongoose.model('org',orgSchema);
//connect with database
mongoose.connect('mongodb://localhost:27017/mydb');
// make this available to our users in our Node applications
module.exports = eventOrg;
//module.exports=orgs;