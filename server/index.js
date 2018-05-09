require('dotenv').config()
var express = require('express');
var path = require('path');
var app = express();
require("./config/mongoose.js");
route_app = require("./config/configRoute.js")
require("./config/ftpServer");
route_app(app)

const port = 3001
app.listen(port, ()=>{
  console.log(`listening on ${port}`)
})
