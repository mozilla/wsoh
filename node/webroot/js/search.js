var searchResults;
$(function () {
	var timer,
	$searchResults = $('#search-results'),
	$searchBox = $('#search-field');
	
	$("#search-open").click(function () {
		$("#search-box").fadeIn();
		return false;
	});
	$("#search-cancel").click(function () {
		$("#search-box").fadeOut();
	});
	
	$("#search-results .song-result").live("click", function () {
		audioPlaylist.playlistAdd(searchResults[parseInt($(this).attr('data-index'), 10)]);
		$("#search-box").fadeOut(function () {
			$searchBox.val("");
			$("#search-results").html("");
		});
	});
	
	$searchBox.keyup(function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			var search = $searchBox[0].value;
			$searchResults.fadeOut(10).html('').fadeIn(10);
			$.get('http://localhost:4567/search?q='+search, function (response) {
				response = $.parseJSON(response);
				searchResults = response;
				var add=[];
				try {
					for (var i=0,len=200;i<len;i++) { //iterates through each item of response  
					//benchmark: rendering all 200 items only take 5 ms or so. slow part is ajax request
						song = response[i];
						//track = song.track;
						//artistID = song.artistID;
						songName = song.songName;
						//albumID = song.albumID;
						//albumName = song.albumName;
						//artworkUrl = song.artworkUrl;
						artistName = song.artistName;
						//songID = song.songID
						add.push('<div class="song-result" data-index="' + i + '"><div class="song-result-index"><span>' + (i + 1) +'</span></div><div class="song-result-album-art"><img src="' + song.artworkURL + '" height="35"></div><div class="song-result-album-information"><div class="song-result-album-information-song">' + song.songName + '</div><div class="song-result-album-information-artist">' + song.albumName + " by " + song.artistName + '</div></div></div>');
					}
				$searchResults.html(add.join(""));
				} catch (e) {
					$searchResults.html("<div style='padding: 10px;'>No results</div>")
				}
			
			})
		$searchResults.html("<div style='padding: 10px;'>Searching...</div>");
		}, 300); 
	});
});