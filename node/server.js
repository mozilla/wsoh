var
  path = require('path'),
  fs = require('fs'),
  nowjs = require("now"),
  express = require("express"),

  PORT = 8003,
  WEBROOT = path.join(path.dirname(__filename), '/webroot');

var server = express.createServer();
server.use('/static',express.static(WEBROOT));
server.get('/playlist/*',function(req, response){
  fs.readFile(__dirname+'/index.html', function(err, data){
    response.writeHead(200, {'Content-Type':'text/html'}); 
    response.write(data);  
    response.end();
  });
});
server.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(server);

//Talk to database but not really
var playlists={}
var owen='win'
var getPlaylist = function(ID){
  if(playlists[ID]==undefined){
    return owen;
  }else{
    return playlists[ID];
  }
}

function set_playlist(ID,playlist){
  playlists[ID]=playlist
}

everyone.now.distributeMessage = function(message){
  set_playlist(this.now.roomID,message)
  everyone.now.printToConsole(message,this.now.roomID)
};

everyone.now.printToConsole = function(message, targetRoomId){
  if(targetRoomId == this.now.roomID){
    this.now.consoleOut(message);
  }
};

 everyone.on('connect', function(){
   this.now.setup(getPlaylist(this.now.roomID));
 });
