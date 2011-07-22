var
  path = require('path'),
  fs = require('fs'),
  nowjs = require("now"),
  express = require("express"),

  PORT = 8003,
  WEBROOT = path.join(path.dirname(__filename), '/webroot');
  
  
var redislib = require("redis"),
    redis = redislib.createClient();
    
redis.on("error", function (err) {
    console.log("Redis connection error to " + redis.host + ":" + redis.port + " - " + err);
});

redis.SET('hello','world')
var redis_get= function(key,callback){
  redis.GET(key, function(err, res){
    callback(res);
  });
}
redis_get('hello',console.log)

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

function set_playlist(ID,playlist){
  redis.SET('playlist:'+ID,playlist)
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
  redis_get('playlist:'+this.now.roomID,this.now.setup)
});
