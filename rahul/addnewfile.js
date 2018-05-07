addNewProblem:function(request,response){
if(request.files.length>0 && request.files[0].size >5242880){
  response.end('large');
}
else
{
  User.find({email:request.session.userEmail},function(err,user){
  if(err) { response.end('0'); throw err;}
          if(user.length>0){
          var d = new Date();
          var newProblem=problem({
          author:user[0].name,
          area:user[0].area,
          topic:request.body.prbmTopic,
          description:request.body.prbmDescription,
          img:"",
          admin:'',
          like:'',
          dislike:'',
          time:d.toString()
          });
  if(request.files.length>0){
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      var img_extension=request.files[0].originalname.split('.');
      var img_name = text+'.'+img_extension[1];
      var old_path=request.files[0].path;
      var new_path=request.files[0].destination+'/'+img_name;
      fs.rename(old_path, new_path, function (err) {
      if (err) { response.end('0'); throw err;}
      Jimp.read(new_path, function (err, rec_img) {
      if (err) { response.end('0'); throw err;}
       rec_img.autocrop()
           .resize(1000, Jimp.AUTO)
           .quality(50)        
           .write(new_path); 
        });
     });
    newProblem.img='/upload/'+img_name;
  }

          newProblem.save(function(err){
            if(err){response.end('0'); throw err;} 
            else{
              response.end('1');
            }
          });
        }
    });
  }
}