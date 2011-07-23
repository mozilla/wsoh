/*var eventkeyup = function () {
	var timer,
		$searchResults = document.getElementById('#search-results'),
		$searchBox = document.getElementById('song-search-box')
			clearTimeout(timer);
			timer = setTimeout(function () {
				var search = $searchBox[0].value;
				$searchResults.fadeOut(10).html('').fadeIn(10);
				http = new XMLHttpRequest();
				http.open("GET", 'http://localhost:4567/search?q='+search );
				http.onreadystatechange=function() {
				  if(http.readyState == 4) {
				    alert(http.responseText);
				  }
				}
				http.send(null);
			})
}*/

/*
 * response = $.parseJSON(response);
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
							add.push('<div class="song-list-item">' + songName + '&nbsp;by&nbsp;' + artistName +  '</div>');
						}
					$searchResults.html(add.join(""));
					} catch (e) {
						$searchResults.html("No results")
					}
				
				})
			$searchResults.html("Searching");
			}, 300); 
 */