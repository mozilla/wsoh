var
  path = require('path'),
  fs = require('fs'),
  nowjs = require("now"),
  express = require("express"),
  redislib = require("redis"),

  PORT = 8003,
  WEBROOT = path.join(path.dirname(__filename), '/webroot'),
  redis = redislib.createClient();
      
//Error handler for REDIS    
redis.on("error", function (err) {
    console.log("Redis connection error to " + redis.host + ":" + redis.port + " - " + err);
});

//Asyncronous Get Wrapper for redis
var redis_get= function(key,callback){
  redis.GET(key, function(err, res){
    callback(res);
  });
}

//Create express server
var server = express.createServer();
//Define static files
server.use('/static',express.static(WEBROOT));
//Define route for a playlist
server.get('/playlist/*',function(req, response){
  fs.readFile(WEBROOT+'/index.html', function(err, data){
    response.writeHead(200, {'Content-Type':'text/html'}); 
    response.write(data);  
    response.end();
  });
});
server.listen(8080);

//Setup nowjs
var nowjs = require("now");
var everyone = nowjs.initialize(server);

//#####INTERESTING STUFF STARTS BETLOW#####//

//Playlist objects start with "playlist:"
function set_playlist(ID,playlist){
  redis.SET('playlist:'+ID,playlist);
}

//Server side listener for global distrobution
everyone.now.distributeMessage = function(message){
  set_playlist(this.now.roomID,message)
  everyone.now.printToConsole(message,this.now.roomID)
};

//Filters and prints to a playlist
everyone.now.printToConsole = function(message, targetRoomId){
  if(targetRoomId == this.now.roomID){
    this.now.consoleOut(message);
  }
};

everyone.on('connect', function(){
  redis_get('playlist:'+this.now.roomID,this.now.setup)
});
