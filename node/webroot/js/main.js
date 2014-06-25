now.roomID = window.location.pathname.split('/')[2];
now.setup = function(data) {
	if(data !== null) {
	    data = JSON.parse(data);
	    audioPlaylist.playlistUpdate(data.playlist, data.current);
	}
}
