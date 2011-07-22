var
  path = require('path'),
  fs = require('fs'),
  nowjs = require("now"),
  express = require("express"),

  PORT = 8003,
  WEBROOT = path.join(path.dirname(__filename), '/webroot');

var server = express.createServer();
server.use('/static',express.static(WEBROOT));
server.get('/',function(req, response){
  fs.readFile(__dirname+'/index.html', function(err, data){
    response.writeHead(200, {'Content-Type':'text/html'}); 
    response.write(data);  
    response.end();
  });
});
server.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(server);


everyone.now.distributeMessage = function(message){
  nowjs.getGroup(this.now.room).now.receiveMessage(this.now.name, message);
  everyone.now.printToConsole(message,this.now.roomID)
};

everyone.now.printToConsole = function(message, targetRoomId){
  if(targetRoomId == this.now.roomID){
    this.now.consoleOut(message);
  }
};
