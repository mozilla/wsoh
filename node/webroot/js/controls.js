$(document).ready(function(){
    now.receivePause = function() {
        audioPlaylist.playlistPause()
    }
    now.receivePlay = function() {
        audioPlaylist.playlistPlay()
    }
    now.receiveNextSong = function() {
        audioPlaylist.playlistNext()
    }
    now.receivePreviousSong = function() {
        audioPlaylist.playlistPrev()
    }
    now.receiveUpdateTime = function(data) {
        audioPlaylist.playlistUpdateTime(data);
    }
    now.receiveUpdatePlaylist = function(data) {
        console.debug('playlist');
        data = JSON.parse(data);
        audioPlaylist.playlistUpdate(data.playlist, data.current);
    }

    now.receiveUpdateVolume = function(volume){
        $('#song-player').jPlayer("volume", volume);
    }
});
