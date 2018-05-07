$('#search_in_dashboard').trigger("reset");
$(document).ready(function(){
 $('#search_in_dashboard').on('submit',function(event){
   event.preventDefault();
   	 var data = {};
      data.age_min=document.getElementById('age_min').value;
      data.age_max=document.getElementById('age_max').value;
      data.city   =document.getElementById('city').value;
      data.cast   =document.getElementById('cast').value;
      data.religion=document.getElementById('religion').value;
     if (document.getElementById('bride').checked) {
	  data.sex="f";
	}else if (document.getElementById('groom').checked) {
		data.sex="m";
	}
	console.log('data');
    $.ajax({
        type:'POST',
        url:'/get_profiles',
        data:JSON.stringify(data),
        cache:false,
        contentType:'application/json',
        processData:false,
        success:function(result){
          // console.log(JSON.stringify(result));
          get_result(result);
        }
    });
     });
});



function get_result(result){
  var parentdiv=document.getElementById("dynamicParent");
   while (parentdiv.firstChild) {
    parentdiv.removeChild(parentdiv.firstChild);
 }
  var nchild=document.createElement('div');
  nchild.setAttribute("id","dynamicChild");
  parentdiv.appendChild(nchild);
  if(result.length>=1){
    var mydata=result;   
      for(var i=0;i<mydata.length;i++){
      generateDiv(mydata[i]);
     }
  }
}

function generateDiv(myobj){
  var parentdiv=document.getElementById("dynamicParent");
  parentdiv.setAttribute("class","container");

  var dynamic_Container=document.createElement('div');
  dynamic_Container.setAttribute("id","dynamic_container");
  dynamic_Container.setAttribute("style","clear: both");

  // to give break between name city and age etc..
  var br_tag1=document.createElement('br');
  var br_tag2=document.createElement('br');
  var br_tag3=document.createElement('br');
  var br_tag4=document.createElement('br');

  var dynamicChild=document.createElement('div');
  dynamicChild.setAttribute("id",myobj._id);
  dynamicChild.setAttribute("onclick","getProfileDetails(this)");
  // dynamicChild.setAttribute("id","dynamicChild");
  dynamicChild.setAttribute("style","border-radius: 50%;background-color: blue; width: 100px; height:100px; float: left;");
    var dynamicChild_img=document.createElement('img');
    dynamicChild_img.setAttribute("src","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYEVqOTIgTXcwZEJ8sUk9FRQlezMOmjkO9dDuGmDggbWvccx-3wA"); //replace the link by myobj.image
    dynamicChild_img.setAttribute("style","border-radius: 50%; width: 100px; height:100px");
  var childData=document.createElement('div');
  childData.setAttribute("id","childData");


  var name=document.createElement('span');
  var text_name=document.createTextNode("Name: "+ myobj.name);
  name.appendChild(text_name);

  var job_title=document.createElement('span');
  var text_job_title=document.createTextNode("Job Title: " + myobj.job_title);
  job_title.appendChild(text_job_title);

  var city=document.createElement('span');
  var text_city=document.createTextNode("City: "+ myobj.city);
  city.appendChild(text_city);

  var age=document.createElement('span');
  var text_age=document.createTextNode("Age "+ myobj.age);
  age.appendChild(text_age);

  childData.setAttribute("style","background-color: #F5F5F5;border-radius:10px;width: 500px; float: left;margin-left: 25px;");
  
  childData.appendChild(name); childData.appendChild(br_tag1);

  childData.appendChild(city); childData.appendChild(br_tag2);

  childData.appendChild(age); childData.appendChild(br_tag3);

  childData.appendChild(job_title); childData.appendChild(br_tag4);

  dynamicChild.appendChild(dynamicChild_img);

  
  dynamic_Container.appendChild(dynamicChild);
  dynamic_Container.appendChild(childData);

  parentdiv.appendChild(dynamic_Container);
} 
function getProfileDetails(currObj){
  // console.log((currObj.getAttribute('id')));
  data={};
  data.id=currObj.getAttribute('id');
  console.log("data sent to server is "+JSON.stringify(data));
  $.ajax({
  success:function(result){
      {
        window.location.href = "/profile/"+ data.id;
      }
    }
  });
}