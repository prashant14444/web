function getcookie(cname){
	// console.log("getcookie function started");
	 var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    // console.log("decoded cookie is "+ decodedCookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setcookie(cname,cvalue){
	console.log("setcookie is called ");
	 document.cookie =cname + "=" + cvalue + ";";
}
function checkcookie(result) {
	console.log("checkcookie is called");
    var cookie=getcookie("emailid");
    if (cookie != "") {
        console.log("Welcome again " + cookie);
    } 
    else 
    {

        console.log("Cookie is not set lets set it");
        if (result.email)
    	setcookie("emailid", result.email);
        if (result.city)
    	setcookie("city", result.city);
        if (result.state)
    	setcookie("state", result.state);
        if (result.address)
    	setcookie("address", result.address);
        if (result.job_title) 
    	setcookie("job_title", result.job_title);
        if (result.job_area)
    	setcookie("job_area", result.job_area);
        if (result.age)
    	setcookie("age", result.age);
        if (result.religion)
    	setcookie("religion", result.religion);
        if (result.caste)
    	setcookie("caste", result.caste);
        if (result.phone_number)
        setcookie("phone_number", result.phone_number);
        if (result.sex)
    	setcookie("sex", result.sex);
        if (result.company_name)
    	setcookie("company_name", result.company_name);
        if (result.address)
    	setcookie("address", result.address);
        if (result.username)
    	setcookie("username",result.username);
        if(result.sex)setcookie("sex",result.sex);
    }
}

function load_data(){
	console.log("load_data is called");
	var data = {};
	$.ajax({
	type:'get',
	url:'/get_profile_data',
	data:JSON.stringify(data),
	cache:false,
	contentType:'application/json',
	processData:false,
	success:function(result){
		console.log("load_data result is received");
	      console.log("data recieved at client side " + JSON.stringify(result));

          // update the side navbar dynamically when usser logs in by updating his/her name, profilepic, email id,name
	      var profilepic=document.getElementById('profilepic');
	      profilepic.setAttribute("src",result.image);

	      document.getElementById('profile_name').innerHTML= result.name;
	      document.getElementById('emailid').innerHTML= result.email;
          console.log("next function is checkcookie");
          // also set the cookie to avoid db query an delete it when logging out
	      checkcookie(result);	         
		}
	});
}