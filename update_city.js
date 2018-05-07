var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  city=["Kanpur","Lucknow","Meerut","Banaras","Jhansi","Gorakhpur","Allahabad","Rampur","Firozabad","Etawah"];
	var rand = city[Math.floor(Math.random() * city.length)];
	// console.log(rand);
	  var newvalues = {$set: {city: rand} };
	  dbo.collection("user_data").updateMany({}, newvalues, function(err, res) {
	    if (err) throw err;
	     console.log(res.result.nModified + " document(s) updated");
    	db.close();
	  });
	});