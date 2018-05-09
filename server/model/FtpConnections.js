var mongoose = require('mongoose');
Schema = mongoose.Schema;
var FtpConnectionsSchema= new mongoose.Schema({
  Username: {
    type: String
  },
  Password: {
    type: String
  },
},{timestamps: true})
 var FtpConnections = mongoose.model('FtpConnections', FtpConnectionsSchema);
