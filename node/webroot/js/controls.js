$(document).ready(function(){
    now.receivePause = function() {
        console.debug('pause');
    }
    now.receivePlay = function() {
        console.debug('play');
    }
    now.receiveNextSong = function() {
        console.debug('next');
    }
    now.receivePreviousSong = function() {
        console.debug('previous');
    }
    now.receiveUpdateTime = function(seconds) {
        console.debug(seconds);
    }
    now.receiveUpdatePlaylist = function(data) {
        console.debug('playlist');
        $('div').text(data);
    }
    
    now.receiveUpdateVolume = function(volume){
        console.debug('volume');
        console.debug(volume);
    }
});

