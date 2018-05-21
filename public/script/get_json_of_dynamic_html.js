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
          var testObject={};
          localStorage.setItem('testObject', JSON.stringify(result));
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
    console.log(mydata);
    var current_page=document.getElementById('no1').innerHTML;
    var low= (current_page*10)-10;
    var high=(current_page*10);
    var len=mydata.length;
    console.log("ok1");
    console.log("value of current_page is "+ current_page);
    console.log("value of low is "+ low);
    console.log("value of high is "+ high);
    console.log("value of len is "+ len);
    high=len>high?high:len;
    console.log("updated value of high is "+ high);
      for(var i=low;i<high;i++){
      generateDiv(mydata[i]);
     }
     if(high==len){
      var current_page=document.getElementById('no3').innerHTML;
        document.getElementById('no3').innerHTML=Number(current_page)-1;
        document.getElementById('no2').innerHTML=Number(current_page)-2;
        document.getElementById('no1').innerHTML=Number(current_page)-3;
        document.getElementById('next_page').setAttribute("class", "disabled");
        // document.getElementById('no2').disabled = true;
        // document.getElementById('no3').disabled = true;
     }
  }
  else
    alert("No Result Found!");
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
    dynamicChild_img.setAttribute("src","https://2.bp.blogspot.com/-JpqHT6G7PeA/WfrlXzx4G9I/AAAAAAAAMho/GDxHGMhNxDAwCl497o-FWJ0G8__RjN09wCLcBGAs/s640/image%2Bof%2Bnikki%2Bgalrani.jpg"); //replace the link by myobj.image
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