var mongoose = require('mongoose');
Schema = mongoose.Schema;
var ImageSchema= new mongoose.Schema({
  Img1: {type:Buffer},
  Img2: {type:Buffer},
  Img3: {type:Buffer},
  ProductEdgeId: {type:String},
  _Product: {type: Schema.Types.ObjectId, ref: 'Product'},

},{timestamps: true});


var Image = mongoose.model('Image', ImageSchema);
