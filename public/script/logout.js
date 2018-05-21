var data={};

function deletecookie(cname) {
    document.cookie = cname + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function deletecookies() {
	// console.log("checkcookie is called"); 
	deletecookie("emailid");
	deletecookie("city");
	deletecookie("state");
	deletecookie("address");
	deletecookie("job_title");
	deletecookie("job_area");
	deletecookie("age");
	deletecookie("religion");
	deletecookie("caste");
	deletecookie("sex");
	deletecookie("company_name");
	deletecookie("address");
	deletecookie("username");
	deletecookie("phone_number");
}

function logout(){
		// delete Cookies Before logging out
		localStorage.clear();
		deletecookies();
		$.ajax({
	    type:'get',
	    url:'/logout',
	    data:JSON.stringify(data),
	    cache:false,
	    contentType:'application/json',
	    processData:false,
	    success:function(result){
	      if(result=='loggedout'){
	            window.location.href = "/";
	        }
	    }
	});
}