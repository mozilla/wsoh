var
  path = require('path'),
  express = require('express'),
  fs = require('fs'),
  nowjs = require("now")

  PORT = 8003,
  WEBROOT = path.join(path.dirname(__filename), 'webroot');

app = express.createServer()
app.use('/static',express.static(WEBROOT));

app.get('/', function(req,res){
  fs.readFile(WEBROOT+'/index.html', function(err, data){
    res.writeHead(200, {'Content-Type':'text/html'}); 
    res.write(data);  
    res.end();
  });
  
});

app.listen(PORT);
var everyone = nowjs.initialize(app);
console.log('App running on port ' + PORT);



//Talk to database but not really
var playlists={}
function get_playlist(ID){
  return playlists[ID];
}

function set_playlist(ID,playlist){
  playlists[ID]=playlist
}

everyone.now.brodcastPlayist = function(playlist){
  set_playlist(this.now.roomID,playlist);
  everyone.now.filterBroadcastPlaylist(playlist,this.now.roomID)
}

everyone.now.filterBroadcastPlaylist = function(playlist, targetRoomId){
  if(targetRoomId == this.now.roomID){
    this.now.receivePlaylist(playlist);
  }
}

/*
nowjs.on('connect', function(){
  this.now.room = "room 1";
  nowjs.getGroup(this.now.room).addUser(this.user.clientId);
  console.log("Joined: " + this.now.name);
});


nowjs.on('disconnect', function(){
  console.log("Left: " + this.now.name);
});*/

everyone.now.changeRoom = function(newRoom){
  nowjs.getGroup(this.now.room).removeUser(this.user.clientId);
  nowjs.getGroup(newRoom).addUser(this.user.clientId);
  this.now.room = newRoom;
  this.now.receiveMessage("SERVER", "You're now in " + this.now.room);
}

everyone.now.distributeMessage = function(message){
  nowjs.getGroup(this.now.room).now.receiveMessage(this.now.name, message);
};

