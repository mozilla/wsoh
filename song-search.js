<html>
<head>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script> 
<script>
$(document).ready ( function {
	$('#song-search-box').keyup(function () {
		var search = this.val;
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
	})

	
}
</script>
</head>
<body>
<input id="song-search-box" placeholder="Add a song!"></input>
<div id="search-results">

</div>
</body>
</html>
