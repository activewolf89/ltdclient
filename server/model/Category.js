var mongoose = require('mongoose');
Schema = mongoose.Schema;
var CategorySchema= new mongoose.Schema({

_Items: [{type: Schema.Types.ObjectId, ref: 'Item'}],

Name: {
  type: String
},

},{timestamps: true})
 var Category = mongoose.model('Category', CategorySchema);
