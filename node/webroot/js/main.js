$(document).ready(function(){
    now.roomID = window.location.pathname.split('/')[2]
    now.setup = function(playlist){
        audioPlaylist.playlistChange(playlist);
    }
});
