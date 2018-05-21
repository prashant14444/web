var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var app = express();
var myfun=require('./functions.js');
var session=require('express-session');
var multer  = require('multer');
var path= require('path');
var fs=require('fs');
var user_schema_entry=require('./user_data_schema.js');
var users_schema=require('./users_schema.js');
 app.use( bodyParser.json() );

app.use(session({secret:"dhdff#$sgF&*sgdfh_(jfdh$dgfdg",resave:true,saveUninitialized:true}));
app.use(bodyParser.urlencoded({
  extended: true
}));
 app.use(express.static(__dirname+'/public'))
 app.get('/', function(req, res) {
    if(req.session.email)
      {
        res.sendFile(__dirname+'/public/html/dashboard.html');
      }
    res.sendFile(__dirname+'/public/html/index.html');
 });

//code for file uploading starts here
app.use(multer({
  dest:path.join(__dirname,'public/uploads')
}).any());
//code for file uploading ends here


 //Code for handeling new user registration starts here
app.post('/check/user/availabilty',function(req,res){

  console.log(req.body.email);
  users_schema.find({email: req.body.email},function(err,result)
  {
    console.log(result);
    if(result.length>0)
    res.send("Already Exist");
    else
    {
      var user_schema_entry_data=new user_schema_entry({
        email : req.body.email,
        name  : req.body.name,
      });
      user_schema_entry_data.save(function(err){
        if(err)
          res.send("fail");
        else
          {
            var users_data=new users_schema({
              email : req.body.email,
              name  : req.body.name,
              password: req.body.password
            });
            users_data.save(function(err){
              if(err)
                res.send("fail");
              else
                res.send("successfully registered");
            });
          }
      });
    }
  });
});

app.get('/registration_successful', function(req, res) {
  console.log("/dashboard is called ");
     res.sendFile(__dirname+'/public/html/registration.html');
 });

app.get('/testimonial_read_more', function(req, res) {
  console.log("/testimonial_read_more is called ");
     res.sendFile(__dirname+'/public/html/read_more.html');
 });

//Code for handeling new user registration ends here

// api for handling user credentials is "/check/user/credential"
app.post("/check/user/credential",function (req,res) {
  // console.log("Email From client side is " + req.body.email);
  // console.log("Password From client side is " + req.body.password);
  users_schema.find({email: req.body.email, password: req.body.password},function(err,result){
    console.log("result array is " + result);
    if (result.length>0) {
      req.session.email=result[0].email;
      console.log("session id is "+ req.session.email);
      res.send("success");
    }
    else
      res.send("fail");
  }); 
})
//code for settings file starts here
app.get('/settings', function(req, res) {
  if (req.session.email)
  {
    console.log("/settings link is clicked! ");
     res.sendFile(__dirname+'/public/html/settings.html');
  }
  else
    res.redirect('/');
 });
//code for settings file ends here 

//code for contact us file starts here
app.get('/contact_us', function(req, res) {
    console.log("/contact_us link is clicked! ");
     res.sendFile(__dirname+'/public/html/contact_us.html');
 });
//code for contact us ends here

// code for followers list starts here
app.get('/followers_list', function(req, res) {
  if (req.session.email)
  {
    console.log("/settings link is clicked! ");
     res.sendFile(__dirname+'/public/html/followers.html');
  }
  else
    res.redirect('/');
 });
//code for followers list ends here


// code for followers list starts here
app.get('/following_list', function(req, res) {
  if (req.session.email)
  {
    console.log("/settings link is clicked! ");
     res.sendFile(__dirname+'/public/html/following.html');
  }
  else
    res.redirect('/');
 });
//code for followers list ends here


app.post("/settings_form_data",function (req,res) {
  // console.log("settings_form_data body is "+JSON.stringify(req.body));
  user_schema_entry.find({email: req.session.email},function(err,result){
    console.log("result array is " + result);
    result[0].profile_visibility=req.body.profile_visibility;
    result[0].email_visibilty=req.body.email_visibilty;
    console.log("session id is "+ JSON.stringify(result[0]));
    result[0].save(function(err){
            if(err){
              throw err;
            } 
            else{
              res.send("success");
            }
          });
    // res.send("success");
  }); 
})

//code for setting file ends here

//code for changeing profile pic starts from here
app.post("/api/upload_profile_image",function (req,res) {
  var result={};
  //check that image is received at sever side and check its size is within limits
  if(req.files.length>0 && req.files[0].size >5242880){
    result.size="large";
  res.json(result);
  }
  else
    {
    user_schema_entry.find({email: req.session.email},function(err,user){
      if(err)
        { 
          res.send('0'); 
          throw err;
        }
      if(user.length>0)
        {
        if(req.files.length>0)
          {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            var img_extension=req.files[0].originalname.split('.');
            var img_name = text+'.'+img_extension[1];
            var old_path=req.files[0].path;
            var new_path=req.files[0].destination+'/'+img_name;
            fs.rename(old_path, new_path, function (err) {
            if (err) { 
              result.success='0';
              response.json(result); throw err;}
           });
            user[0].image='/uploads/'+img_name;
          }
          user[0].save(function(err){
            if(err){
              result.success='0';
              response.json(result); throw err;} 
            else{
              result.success='1';
              result.image=user[0].image;
              res.json(result);
            }
          });
        }
      });
    }
  console.log("Image Data recieved length is "+JSON.stringify(req.files[0]));
  // res.send('1');
})
//code for changeing profile pic starts from here


// search result in dashboard 
app.post("/get_profiles",function (req,res) {
  console.log(req.body);
  var r_data=req.body;
  console.log(req.body);
  if (r_data.age_min===r_data.age_max) {
    console.log("get_result is called");
    user_schema_entry.find({age: r_data.age_min, city: r_data.city, religion: r_data.religion, sex: r_data.sex, caste: r_data.cast},function(err,result){
    console.log("result fetched from db is " + result);
    res.json(result);
     // res.send("ok");
    })
  }
 else
   {
     user_schema_entry.find({age: {"$gte": r_data.age_min, "$lt": r_data.age_max}, city: r_data.city, religion: r_data.religion, sex: r_data.sex, caste: r_data.cast},function(err,result){
     console.log(result);
     res.json(result);
      // res.send("ok");
  })
   }
})
// search result in dashboard code ends here

// Dynamic page Onclick event on every single result of search result in dashboard starts here 
app.get('/profile/:id', function(req, res) {
  // Then you can use the value of the id with req.params.id
  // So you use it to get the data from your database:
  return user_schema_entry.findOne({ _id: req.params.id }, function (err, result) {
    if (err) { throw(err); }
    {
      console.log(JSON.stringify(result));
      res.sendFile(__dirname+'/public/html/view_profile_in_detail.html');
    }
  });
});
// Dynamic page Onclick event on every single result of search result in dashboard starts here 

// update db data and update profile

app.post("/update_db_profile",function (req,res) {
  // console.log("Edit Profile Data Is Receieved At Server side is "+req.body);
  user_schema_entry.find({email: req.session.email},function(err,result){
    console.log("Api /update_db_profile is called");
    console.log("file received at server side is"+ JSON.stringify(req.body.pic));
     result[0].company_name=req.body.company_name;
     result[0].city=req.body.city;
     result[0].job_title=req.body.job_title;
     result[0].job_area=req.body.job_area;
     result[0].phone_number=req.body.phone_number;
     result[0].age=req.body.age;
     result[0].state=req.body.state;
     result[0].religion=req.body.religion;
     result[0].caste=req.body.caste;
     result[0].address=req.body.address;
     result[0].sex=req.body.sex;
     result[0].save();
     res.send("success");
     })
})

//when user will login this api will handle the dashboard page 
app.get('/dashboard', function(req, res) {
  if (req.session.email) {
    user_schema_entry.find({email: req.session.email},function(err,result){
     // console.log(result);
     })
     res.sendFile(__dirname+'/public/html/dasboard.html');
  }
  else
    res.redirect('/');
  // console.log("/dashboard is called "+req.session.usrEmail);
 });

app.get('/get_profile_data', function(req, res) {
  console.log("/get_profile_data is called "+req.session.email);
  user_schema_entry.find({email: req.session.email},function(err,result){
     console.log(result[0]);
     res.json(result[0]);
     })
 });

app.get('/update_profile', function(req, res) {
     res.sendFile(__dirname+'/public/html/edit_profile_details.html');
 });
//destroy session and redirect to home page
app.get('/logout', function(req, res) {
    req.session.destroy();
    // console.log("session id is "+ req.session.usrEmail);
     res.send("loggedout");
 });

// mongo db connection and creating db to register user
 app.listen(8080);
