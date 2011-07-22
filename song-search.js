var search = 'test song name' //probably want to use the following to get text from search field $('#elementID').val(); 

$.get('http://localhost:4567/search?q='+search, function (response) {
	response = $.parseJSON(response);	
	for (var i=0,max=response.length;i<max;i++) { //iterates through each item of response 
		song = response[i];
		track = song.track;
		artistID = song.artistID;
		songName = song.songName;
		albumID = song.albumID;
		albumName = song.albumName;
		artworkUrl = song.artworkUrl;
		artistName = song.artistName;
		songID = song.songID
		console.log(artistName);
	}
})
