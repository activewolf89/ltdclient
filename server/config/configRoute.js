var mongoose = require('mongoose');
var ProductRoute = require('./../controller/ProductController.js')

module.exports = function(app){

  app.get('/products',(req,res)=>{
    ProductRoute.read(req,res)
  })
  app.get('/update',(req,res)=>{
    ProductRoute.update(req,res)
  })
}
