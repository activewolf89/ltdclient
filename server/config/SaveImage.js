var mongoose = require('mongoose');
var Image = mongoose.model('Image');
var fs = require('fs');

var SaveImage = function(imageName,rootPath){
  var storeImageNameNoExt = ('001-' + imageName).split('.').shift();
  var PhotoNumber = storeImageNameNoExt.split('-')[3];
  var UniqueProductId;
  if(PhotoNumber){
    UniqueProductId = storeImageNameNoExt.split('-').slice(0,3).join('-');
  } else {
    UniqueProductId = storeImageNameNoExt;
  }
  var fullImagePath = rootPath + '/' + imageName;
  fs.readFile(fullImagePath, function(err, data) {
    // Encode to base64
    var encodedImage = new Buffer(data, 'binary')
    switch(PhotoNumber){
      case '02':
      Image.findOneAndUpdate({ProductEdgeId: UniqueProductId},
        {$set:{Img2:encodedImage}}, {upsert: true,new:true},(err,updatedImageDocument)=>{
          if(err){
            console.log(err)
          } else {
            fs.unlink(fullImagePath)
          }
        });
        break;
      case '03':

      Image.findOneAndUpdate({ProductEdgeId: UniqueProductId},
        {$set:{Img3:encodedImage}}, {upsert: true,new:true},(err,updatedImageDocument)=>{
          if(err){
            console.log(err)
          } else {
            fs.unlink(fullImagePath)
          }
        });
        break;
      default:

      Image.findOneAndUpdate({ProductEdgeId: UniqueProductId},
        {$set:{Img1:encodedImage}}, {upsert: true,new:true},(err,updatedImageDocument)=>{
          if(err){
            console.log(err)
          } else {
            fs.unlink(fullImagePath)

          }
        });
        break;
    }
  });
return
}

module.exports = SaveImage;
