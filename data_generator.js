var faker = require('faker');
var myobj=[];
var city=["Kanpur","Lucknow","Agra","Meerut","Banaras","Jhansi","Gorakhpur","Allahabad","Rampur","Firozabad","Etawah"];
var religion=["Hindu","Muslim","Christian","Sikh","Judism","Jain"];
var caste = ["Lodha","Agrawal","Gupta","Saini","Ahir","Rajpoot","Brahmins","Sunar","Dalit","Gurjar","Jaat"];
var sex   = ["m","f"];

for (var i = 0; i < 200000; i++) {
  var temp={};
  temp.name = faker.name.findName();
  temp.email = faker.internet.email();
  temp.job_title=faker.name.jobTitle();
  temp.job_area=faker.name.jobArea();
  temp.phone_number=faker.phone.phoneNumber();
  temp.age=faker.random.number({
    'min': 10,
    'max': 50
});
  temp.activated=faker.random.number({
    'min': 0,
    'max': 1
});
  temp.hidden=faker.random.number({
    'min': 0,
    'max': 1
});
  temp.address=faker.address.streetAddress();
  temp.city=city[Math.floor(Math.random() * city.length)];
  temp.religion=religion[Math.floor(Math.random() * religion.length)];
  temp.caste=caste[Math.floor(Math.random() * caste.length)];
  temp.sex=sex[Math.floor(Math.random() * sex.length)];
  temp.state=faker.address.state();
  temp.company_name=faker.company.companyName();
  temp.image=faker.image.people();
  temp.username=faker.internet.userName();
  // console.log(temp);
  myobj.push(temp);
}
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("user_datas").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
