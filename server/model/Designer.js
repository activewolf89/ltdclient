var mongoose = require('mongoose');
Schema = mongoose.Schema;
var DesignerSchema= new mongoose.Schema({

_Items: [{type: Schema.Types.ObjectId, ref: 'Item'}],

Name: {
  type: String
},
Discountable: {
  type: Boolean
}

},{timestamps: true})
 var Designer = mongoose.model('Designer', DesignerSchema);
