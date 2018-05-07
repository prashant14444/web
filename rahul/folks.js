function myfun(){
	  var mymenu=document.getElementById('id001');
    if(mymenu.style.display!="block"){
        mymenu.style.display="block";
    }
    else{
    	mymenu.style.display="none";
    }
}
function hideNewDiv(){
	    var mymenu=document.getElementById('id001');
      document.getElementById('prbmForm').reset();
    	mymenu.style.display="none";
}
function myresizefn(){
var outWidth=window.outerWidth;
if (outWidth >=700) {
       var mn=document.getElementById("menudiv");
       if (mn.style.display=='none') {
        mn.style.display="block";
       }
   }
}
function myproblem(pdata){
    var parentdiv=document.getElementById("dynamicParent");
    if(parentdiv.childElementCount>0){
        document.getElementById('dynamicChild').remove();   
     }
      var nchild=document.createElement('div');
      nchild.setAttribute("id","dynamicChild");
      parentdiv.appendChild(nchild);
      var size=pdata.length;
      var user_area=pdata[size-1].u_area;
      var userArea=document.getElementById("areaName");
      var userName=document.getElementById('usrName');
      userName.setAttribute("style","font-weight:bold");
      userArea.setAttribute("style","font-weight:bold");
      userName.innerHTML=pdata[size-1].u_name;
      userArea.innerHTML=user_area;
      if(pdata.length>1){
      var mydata=pdata;
      var user_id=pdata[size-1].u_id;   
      pdata.pop();
        for(var i=0;i<mydata.length;i++){
        generateDiv(mydata[i],user_id,'p');
       }
    }
   else 
   generateNodata();
}

function myfollowing(fdata) {
   var parfdiv=document.getElementById("dynamicParent");
   if(parfdiv.childElementCount>0){
        document.getElementById('dynamicChild').remove();   
       } 
        var nfchild=document.createElement('div');
        nfchild.setAttribute("id","dynamicChild");
        parfdiv.appendChild(nfchild);
        if (fdata.length>1) {
        var user_id=fdata[fdata.length-1].u_id;
        fdata.pop(); 
        var followdata=fdata;       
        for(var j=0;j<followdata.length;j++){
           generateDiv(followdata[j],user_id,'e');
         }
      }
    else
    generateNodata();
}

function mysuggestion(sdata) {
	  var sugdata=sdata;
	  var parasdiv=document.getElementById('dynamicParent');
	  	  if(parasdiv.childElementCount>0){
	  	    document.getElementById('dynamicChild').remove();	
    }
    var sub=document.createElement('div');
    sub.setAttribute("id","dynamicChild");
    parasdiv.appendChild(sub);
        if(sugdata.length!=0){
        for(var i=0;i<sugdata.length;i++)
         generateSugstn(sugdata[i]);
      }
      else{
        generateNodata();
      }    
}

function generateSugstn(s) {
	  var pagesubdiv=document.getElementById('dynamicChild');
	  var divfollow=document.createElement('div');
    var org=document.createElement('span');
	  var orgval=document.createTextNode("Name : ");
	  org.setAttribute("style","font-weight:bold;")
    org.appendChild(orgval);
    var orgarea=document.createElement('span');
	  var orgareaval=document.createTextNode("Area: ");
	  orgarea.setAttribute("style","font-weight:bold;")
    orgarea.appendChild(orgareaval);
    var but=document.createElement('button');
    but.setAttribute('id',s._id);
    but.setAttribute('onclick','followbtnFn(this)');
    var butval=document.createTextNode("Follow");
    but.setAttribute("class","followbtn");
    but.appendChild(butval);
    var followname=document.createElement('span');
	  var line=document.createElement('br');
	  var fname=document.createTextNode(s.name);
    followname.appendChild(fname);
	  var followarea=document.createElement('span');
	  var farea=document.createTextNode(s.area);
	  followarea.appendChild(farea);
	  divfollow.appendChild(org);
	  divfollow.appendChild(followname);
	  divfollow.appendChild(but);
    divfollow.appendChild(line);
	  divfollow.appendChild(orgarea);
	  divfollow.appendChild(followarea); 
	  divfollow.setAttribute("style","background-color:#fff;margin:20px 0px;padding:20px;") 
	  pagesubdiv.appendChild(divfollow);
	
}
function makevisibleUp(){
  document.getElementById('up').style.display='block';
}

function generateNodata(){
   var pagediv=document.getElementById('dynamicChild');
   var n_div=document.createElement('div');
   n_div.setAttribute('style',"width:100%");
   var n_img=document.createElement('img');
   n_img.setAttribute('src',"/image/nodata.jpg");
   n_img.setAttribute('style',"width:50%;display:block;margin:auto;");
   n_div.appendChild(n_img);
   pagediv.appendChild(n_div);
}


function generateDiv(a,u_rid,divTpye){
  var pagediv=document.getElementById('dynamicChild');
  var mydiv=document.createElement("div");
  var authr=document.createElement('span');
  var authrval=document.createTextNode("Author:");
  authr.setAttribute("style","font-weight:bold;")
  authr.appendChild(authrval);
  var areatag=document.createElement('span');
  var areaval=document.createTextNode("Area:");
  areatag.setAttribute("style","font-weight:bold;")
  areatag.appendChild(areaval);
    
  var prbmt=document.createElement('span');
  var prbmtval=document.createTextNode("Topic:");
  prbmt.setAttribute("style","font-weight:bold;")
  prbmt.appendChild(prbmtval);
    
  var prbmd=document.createElement('span');
  var prbmdval=document.createTextNode("Description:");
  prbmd.setAttribute("style","font-weight:bold;")
  prbmd.appendChild(prbmdval);

  var prbmad=document.createElement('span');
  var prbmadval=document.createTextNode("Admin\'s Reply:\t");
  prbmad.setAttribute("style","font-weight:bold;")
  prbmad.appendChild(prbmadval);
  if(divTpye=='e'){
    prbmad.setAttribute('style','visibility:hidden');
  }
    var br1=document.createElement('br');
    var br2=document.createElement('br');
    var br3=document.createElement('br');
    var br4=document.createElement('br');
    var br5=document.createElement('br');

    var txt1=document.createElement('span');
    var p1=document.createTextNode(a.author);
    txt1.appendChild(p1);
    var txt2=document.createElement('span');
    var p2=document.createTextNode(a.area);
    txt2.appendChild(p2);
    var prbmtpoic=document.createElement('span');
    var p3=document.createTextNode(a.topic);
    prbmtpoic.appendChild(p3);
    var prbmdes=document.createElement('span');
    var p4=document.createTextNode(a.description);
    prbmdes.appendChild(p4);
    var prbmimg=document.createElement('img');
    prbmimg.setAttribute("src",a.img);
    prbmimg.setAttribute("class","prbm_bimage");
    //prbmimg.setAttribute("style","display:block;width:50%;margin:20px auto 20px auto;");
     if(a.img){
       prbmimg.setAttribute("class","prbm_image");
    }
    var prbmadmin=document.createElement('span');
    if(a.admin){
       var p5=document.createTextNode(a.admin);
       prbmadmin.appendChild(p5);
    }
    else if(a.admin==''&& divTpye=='p'){
       var p5=document.createTextNode("Not Replied");
       prbmadmin.appendChild(p5);
    }
    var likedislikeDiv=document.createElement('div');
    likedislikeDiv.setAttribute("style","width:100%;");
    var like_div=document.createElement('div');
    like_div.setAttribute('id',a._id+"@l"+divTpye);
    like_div.setAttribute('class',"likeDiv");
    like_div.setAttribute('onclick','likeButtonPress(this)');
    var like_img=document.createElement('img');
    like_img.setAttribute('id',a._id+"@limg"+divTpye);
    var a_likeIndex=a.like_by.indexOf(u_rid);
    if(a_likeIndex==-1){
       like_img.setAttribute('src',"/image/elike.png");
      }
    else{
         like_img.setAttribute('src',"/image/flike.png");
      }
    like_img.setAttribute("style","width:30px;height:30px;verticaL-align:middle;");
    var like_text=document.createElement('span');
    like_text.setAttribute("style","margin:10px;");
    like_text.setAttribute("id",a._id+"@ltext"+divTpye);
    var like_text_val=document.createTextNode("Like:"+" "+a.like_by.length);
    like_text.appendChild(like_text_val);
    like_div.appendChild(like_img);
    like_div.appendChild(like_text);
    
    var dislike_div=document.createElement('div');
    dislike_div.setAttribute('id',a._id+"@d"+divTpye);
    dislike_div.setAttribute('class',"dislikeDiv");
    dislike_div.setAttribute('onclick','dislikeButtonPress(this)');
    var dislike_img=document.createElement('img');
    dislike_img.setAttribute('id',a._id+"@dimg"+divTpye);
    var a_dislikeIndex=a.dislike_by.indexOf(u_rid);
     if(a_dislikeIndex==-1){
           dislike_img.setAttribute('src',"/image/edis.png");
      }
    else{
         dislike_img.setAttribute('src',"/image/fdis.png");
      }
    dislike_img.setAttribute("style","width:30px;height:30px;verticaL-align:middle;");
    var dislike_text=document.createElement('span');
    dislike_text.setAttribute("style","margin:10px;");
    dislike_text.setAttribute("id",a._id+"@dtext"+divTpye);
    var dislike_text_val=document.createTextNode("Dislike:"+" "+a.dislike_by.length);
    dislike_text.appendChild(dislike_text_val);
    dislike_div.appendChild(dislike_img);
    dislike_div.appendChild(dislike_text);

    likedislikeDiv.appendChild(like_div);
    likedislikeDiv.appendChild(dislike_div); 
    mydiv.appendChild(authr);
    mydiv.appendChild(txt1);
    mydiv.appendChild(br1);
    mydiv.appendChild(areatag);
    mydiv.appendChild(txt2);
    mydiv.appendChild(br2);
    mydiv.appendChild(br4);
    mydiv.appendChild(prbmt);
    mydiv.appendChild(prbmtpoic);
    mydiv.appendChild(br3);
    mydiv.appendChild(br5);
    mydiv.appendChild(prbmd);
    mydiv.appendChild(prbmdes);
    if(a.img){
      mydiv.appendChild(prbmimg);
    }   
    mydiv.appendChild(likedislikeDiv);
    mydiv.setAttribute("class","singlediv");  
    mydiv.appendChild(prbmad);
    mydiv.appendChild(prbmadmin);
    pagediv.appendChild(mydiv);
}   

function showProblem(){
     $.getJSON('/api/problem',function(data){
      myproblem(data);
     });
    $('#prbm').css({'border-bottom':'2px solid #03a9f4','background':'#fff','color':'#03a9f4'});
    $('#following').css({'border-bottom':'none','background':'#78909C','color':'#fff'});
    $('#suggestion').css({'border-bottom':'none','background':'#78909C','color':'#fff'});
}

function followbtnFn(followbtn){
var info={};
info.o_id=followbtn.getAttribute('id')
$.post('/api/add/new/following',info,function(result){
      if(result=='1'){
       followbtn.innerHTML='Following';
      }
     else if(result=='0'){
     alert('Some error found.please try later');
    }
  });
}

function likeButtonPress(para){
  var btn_id = para.getAttribute('id').split("@");
  var pdata={};
  pdata.r_id=btn_id[0];
  if(btn_id[1]=='lp'){
      $.post('/api/likebutton/problem',pdata,function(data){
       var like_img=document.getElementById(btn_id[0]+'@limgp');
       var like_ele=document.getElementById(btn_id[0]+'@ltextp');
       var like_text=like_ele.innerHTML.split(' ');
       var like_count=Number(like_text[1]);
       var dislike_img=document.getElementById(btn_id[0]+'@dimgp');
       var dislike_ele=document.getElementById(btn_id[0]+'@dtextp');
       var dislike_text=dislike_ele.innerHTML.split(' ');
       var dislike_count=Number(dislike_text[1]);
          if(data=='1'){
          like_count=(like_count+1).toString();
          like_ele.innerHTML='Like:'+" "+like_count;
          like_img.setAttribute('src','/image/flike.png');
          }
          else if(data=='2'){
            like_count=(like_count-1).toString();
            like_ele.innerHTML='Like:'+" "+like_count;
            like_img.setAttribute('src',"/image/elike.png");
          }
          else if(data=='3'){
          like_count=(like_count+1).toString();
          dislike_count=(dislike_count-1).toString();
          like_ele.innerHTML='Like:'+" "+like_count;
          like_img.setAttribute('src','/image/flike.png');
          dislike_ele.innerHTML='Dislike:'+" "+dislike_count;
          dislike_img.setAttribute('src','/image/edis.png');
          }
      });
    }
    else if(btn_id[1]=='le'){
       $.post('/api/likebutton/event',pdata,function(data){
       var like_img=document.getElementById(btn_id[0]+'@limge');
       var like_ele=document.getElementById(btn_id[0]+'@ltexte');
       var like_text=like_ele.innerHTML.split(' ');
       var like_count=Number(like_text[1]);
       var dislike_img=document.getElementById(btn_id[0]+'@dimge');
       var dislike_ele=document.getElementById(btn_id[0]+'@dtexte');
       var dislike_text=dislike_ele.innerHTML.split(' ');
       var dislike_count=Number(dislike_text[1]);
          if(data=='1'){
          like_count=(like_count+1).toString();
          like_ele.innerHTML='Like:'+" "+like_count;
          like_img.setAttribute('src','/image/flike.png');
          }
          else if(data=='2'){
            like_count=(like_count-1).toString();
            like_ele.innerHTML='Like:'+" "+like_count;
            like_img.setAttribute('src',"/image/elike.png");
          }
          else if(data=='3'){
          like_count=(like_count+1).toString();
          dislike_count=(dislike_count-1).toString();
          like_ele.innerHTML='Like:'+" "+like_count;
          like_img.setAttribute('src','/image/flike.png');
          dislike_ele.innerHTML='Dislike:'+" "+dislike_count;
          dislike_img.setAttribute('src','/image/edis.png');
          }
      });
    }
}

function dislikeButtonPress(para){
  var btn_id = para.getAttribute('id').split("@");
  var pdata={};
  pdata.r_id=btn_id[0];
  if(btn_id[1]=='dp'){
      $.post('/api/dislikebutton/problem',pdata,function(data){
       var like_img=document.getElementById(btn_id[0]+'@limgp');
       var like_ele=document.getElementById(btn_id[0]+'@ltextp');
       var like_text=like_ele.innerHTML.split(' ');
       var like_count=Number(like_text[1]);
       var dislike_img=document.getElementById(btn_id[0]+'@dimgp');
       var dislike_ele=document.getElementById(btn_id[0]+'@dtextp');
       var dislike_text=dislike_ele.innerHTML.split(' ');
       var dislike_count=Number(dislike_text[1]);
          if(data=='1'){
          dislike_count=(dislike_count+1).toString();
          dislike_ele.innerHTML='Dislike:'+" "+dislike_count;
          dislike_img.setAttribute('src','/image/fdis.png');
          }
          else if(data=='2'){
            dislike_count=(dislike_count-1).toString();
            dislike_ele.innerHTML='Dislike:'+" "+dislike_count;
            dislike_img.setAttribute('src','/image/edis.png');
          }
          else if(data=='3'){
          dislike_count=(dislike_count+1).toString();
          like_count=(like_count-1).toString();
          dislike_ele.innerHTML='Dislike:'+" "+dislike_count;
          dislike_img.setAttribute('src',"/image/fdis.png");
          like_ele.innerHTML='Like:'+" "+like_count;
          like_img.setAttribute('src','/image/elike.png');
          }
      });
    }
    else if(btn_id[1]=='de'){
       $.post('/api/dislikebutton/event',pdata,function(data){
       var like_img=document.getElementById(btn_id[0]+'@limge');
       var like_ele=document.getElementById(btn_id[0]+'@ltexte');
       var like_text=like_ele.innerHTML.split(' ');
       var like_count=Number(like_text[1]);
       var dislike_img=document.getElementById(btn_id[0]+'@dimge');
       var dislike_ele=document.getElementById(btn_id[0]+'@dtexte');
       var dislike_text=dislike_ele.innerHTML.split(' ');
       var dislike_count=Number(dislike_text[1]);
       if(data=='1'){
              dislike_count=(dislike_count+1).toString();
              dislike_ele.innerHTML='Disike:'+" "+dislike_count;
              dislike_img.setAttribute('src','/image/fdis.png');
          }
          else if(data=='2'){
              dislike_count=(dislike_count-1).toString();
              dislike_ele.innerHTML='Dislike:'+" "+dislike_count;
              dislike_img.setAttribute('src','/image/edis.png');
          }
          else if(data=='3'){
              dislike_count=(dislike_count+1).toString();
              like_count=(like_count-1).toString();
              dislike_ele.innerHTML='Dislike:'+" "+dislike_count;
              dislike_img.setAttribute('src',"/image/fdis.png");
              like_ele.innerHTML='Like:'+" "+like_count;
              like_img.setAttribute('src','/image/elike.png');
          }
      });
    }
 }