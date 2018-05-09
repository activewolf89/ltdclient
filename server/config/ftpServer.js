const FtpSrv = require('ftp-srv');
const ftpServer = new FtpSrv('ftp://192.168.1.24:50');
const path = require(`path`);
var CheckCsv = require('./CheckCsv');
var SaveImage = require('./SaveImage');
var FileHound = require('filehound');
var fs = require('fs');
ftpServer.on('login', ({connection,username,password}, resolve,reject) => {
  var rootPath = path.join(__dirname,`/theedge`)
  connection.on('STOR',(err,fileName)=>{
    const fileNameExt = fileName.split('.').pop().toLowerCase();
    if(fileNameExt === 'jpg' || fileNameExt === 'png' || fileNameExt === 'pdf'){
      SaveImage(fileName,rootPath)
    }
    else if(fileNameExt === 'csv'){

    }
    else {
      fs.unlink(rootPath + '/' + fileName)
    }
  })
  if(username === 'theedge' && password === 'theedge'){
    resolve({
      root: rootPath
    })
  } else {
    reject('Username/Password combination did not work')
  }

  connection.commandSocket.on('close',()=>{
    var Check5Times = 0;
    //check the rootPath to see if there is any csv files first
  var CheckFolderForImages = setInterval(()=>{
    const files = FileHound.create()
    .paths(rootPath)
    .ext('CSV')
    .not()
    .find()
    files.then((MultipleFiles)=>{
      if(Check5Times >= 5){
        fs.unlink(MultipleFiles[0])
        MultipleFiles.shift();
        Check5Times = 0;
      } else {
        Check5Times++;
      }
      if(MultipleFiles.length ===0){
        clearInterval(CheckFolderForImages);
        CheckCsv(rootPath)
      }
    })
    },5000)

  });
});
ftpServer.on('error',()=>{
  console.log('error submitteds')
})

ftpServer.listen()
