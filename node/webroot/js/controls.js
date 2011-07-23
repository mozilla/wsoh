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
    now.receivePreviousSong = function(seconds) {
        console.debug(seconds);
    }
});

