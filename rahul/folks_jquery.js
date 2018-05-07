	$(document).ready(function(){
      $('#prbm').click(function(){
         $.getJSON('/api/problem',function(data){
         myproblem(data);
         });
          $(this).css({'border-bottom':'2px solid #03a9f4','background':'#fff','color':'#03a9f4'});
          $('#following').css({'border-bottom':'none','background':'#78909C','color':'#fff'});
           $('#suggestion').css({'border-bottom':'none','background':'#78909C','color':'#fff'});
      });
      $('#following').click(function(){
            $.getJSON('/api/following',function(data){
            	myfollowing(data);
            });
         $(this).css({'border-bottom':'2px solid #03a9f4','background':'#fff','color':'#03a9f4'});
          $('#prbm').css({'border-bottom':'none','background':'#78909C','color':'#fff'});
           $('#suggestion').css({'border-bottom':'none','background':'#78909C','color':'#fff'});

      });
      $('#suggestion').click(function(){
      	$.getJSON('/api/suggestion',function(data){
      		mysuggestion(data);
      	});
       $(this).css({'border-bottom':'2px solid #03a9f4','background':'#fff','color':'#03a9f4'});
          $('#following').css({'border-bottom':'none','background':'#78909C','color':'#fff'});
           $('#prbm').css({'border-bottom':'none','background':'#78909C','color':'#fff'});
      });

$(function(){
 $('#prbmForm').on('submit',function(event){
    event.preventDefault();
    $('#loader').show();
    var info=document.getElementsByClassName('prbmField');
    if(info[0].value!='' && info[1].value!=''){
       var data =new FormData(this);
       if($('input[name="prbm_img"]')[0].files){
       data.append('prbm_img',$('input[name="prbm_img"]')[0].files);
       }
    $.ajax({
          type:'POST',
          url:'/api/addproblem',
          data:data,
          cache:false,
          contentType:false,
          processData:false,
          success:function(data){
              if(data=='1'){
                   document.getElementById('prbmForm').reset();
                   hideNewDiv();
                   alert("Successful! Thanks for your time.")
                   showProblem();
                    $('#loader').hide(1000);
                 }
                 else if(data=='0'){
                   alert("Error. Please try again.");
                     $('#loader').hide(1000);
                 }
                 else if(data=='large'){
                  alert('Image size exceeded.');
                    $('#loader').hide(1000);
                 }
            }
        });
      }
      else
        alert("All fields are required.");
   });
});

$(function() {
      $('.smooth_scroll').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000); // The number here represents the speed of the scroll in milliseconds
            return false;
          }
        }
      });
});
    

$('#menupic').click(function(){
         $("#menudiv").animate({
            height: 'toggle'
        },'slow');
});

});