now.roomID = window.location.pathname.split('/')[2];
now.setup = function(data) {
    data = JSON.parse(data);
    audioPlaylist.playlistUpdate(data.playlist, data.current);
}
