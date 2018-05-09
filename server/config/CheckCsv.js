const FileHound = require('filehound')
const csv = require('csvtojson');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Image = mongoose.model('Image');
var fs = require('fs');

var CheckCsv = function(rootPath){
  const files = FileHound.create()
  .paths(rootPath)
  .ext('CSV')
  .find()
  files.then((MultipleFiles)=>{
    for(var x = 0; x < MultipleFiles.length;x++){
      var i = x;
      csv()
      .fromFile(MultipleFiles[x])
      .on('json',(jsonObj)=>{
        if(jsonObj.itKey){
        Product.findOneAndUpdate({itKey: jsonObj.itKey}, jsonObj , {upsert: true,new:true},(err,product)=>{
          if(err){
            console.log(err)
          } else {


            Image.findOneAndUpdate({ProductEdgeId: product.itKey},{$set:{_Product:product._id}},{new:true},(err,imageDocument)=>{
              if(err){
                console.log(err)
              } else {
                if(imageDocument){
                  product._Image = imageDocument._id;
                  product.save();
                }
              }
            })
          }
        });
      }
      })
      .on('done',()=>{
          fs.unlink(MultipleFiles[i])
        console.log('parsing finished')
      })
    }
  })
}
module.exports = CheckCsv
