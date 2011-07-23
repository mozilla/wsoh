function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };

	str = (obj.m || "0") + ":";
	if(obj.s < 10 || obj.s == null || obj.s == "undefined") {
		str += "0";
	}
	str += (obj.s || "0");
    return str;
};

var Playlist = function(instance, playlist, options) {
	var self = this;

	this.instance = instance; // String: To associate specific HTML with this playlist
	this.playlist = playlist; // Array of Objects: The playlist
	this.options = options; // Object: The jPlayer constructor options for this playlist

	this.current = 0;

	this.cssId = {
		jPlayer: "",
		interface: "",
		playlist: ""
	};
	this.cssSelector = {};

	$.each(this.cssId, function(entity, id) {
		self.cssSelector[entity] = "#" + id + self.instance;
	});

	if(!this.options.cssSelectorAncestor) {
		this.options.cssSelectorAncestor = this.cssSelector.interface;
	}
	
	this.renderjPlayer = instance && instance != "";
	
	if (this.renderjPlayer) {
		$(this.cssSelector.jPlayer).jPlayer(this.options);

		$(".jp-previous").click(function() {
			self.playlistPrev();
			$(this).blur();
			return false;
		});

		$(".jp-next").click(function() {
			self.playlistNext();
			$(this).blur();
			return false;
		});
		
		$("#song-play-pause").click(function () {
			if(self.renderjPlayer) {
				paused = $(self.cssSelector.interface).data("jPlayer").status.paused
				if(paused) {
					$(self.cssSelector.interface).jPlayer("play");
					$("#song-play-pause").removeClass('paused');
				} else {
					$(self.cssSelector.interface).jPlayer("pause");
					$("#song-play-pause").addClass('paused');
				}
			}
			return false;
		});
		
		$(".song-listing").live("click", function () {
			if(self.renderjPlayer) {
				console.log($(this).attr('data-index'));
				self.playlistChange($(this).attr('data-index'));
			}
			return false;
		});
	}
};
Playlist.prototype = {
	displayPlaylist: function() {
		var out = "";
		for(index = 0; index < this.playlist.length; index++) {
			value = this.playlist[index];
			out += '<div class="song-listing" data-index="' + index + '"><div class="song-listing-index"><span>' + (index + 1) + '</span></div><div class="song-listing-album-art"><img src="' + value.artworkURL + '" height="35" /></div><div class="song-listing-album-information"><div class="song-listing-album-information-song">' + value.songName + '</div><div class="song-listing-album-information-artist">' + value.albumName + " by " + value.artistName + '</div></div></div>';
		}
		document.getElementById("song-list").innerHTML = out;
		this.updateButtons();
	},
	updateButtons: function() {
		if(this.renderjPlayer) {
			paused = $(this.cssSelector.interface).data("jPlayer").status.paused;
			if(paused) {
				$("#song-play-pause").addClass('paused');
			} else {
				$("#song-play-pause").removeClass('paused');
			}
		} else {
			
		}
		return false;
	},
	playlistInit: function(autoplay) {
		if(autoplay) {
			this.playlistChange(this.current);
		} else {
			this.playlistConfig(this.current);
		}
	},
	playlistConfig: function(index) {
		// $(this.cssSelector.playlist + "_item_" + this.current).removeClass("jp-playlist-current").parent().removeClass("jp-playlist-current");
		// $(this.cssSelector.playlist + "_item_" + index).addClass("jp-playlist-current").parent().addClass("jp-playlist-current");
		this.current = index;
		this.displayPlaylist();
		if (this.renderjPlayer) {
			$(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[this.current]);
			$("#song-album-art").attr('src', this.playlist[this.current].artworkURL);
		}
		document.getElementById("song-artist").innerText = this.playlist[this.current].artistName;
		document.getElementById("song-album").innerText = this.playlist[this.current].albumName;
		document.getElementById("song-name").innerText = this.playlist[this.current].songName;
	},
	playlistChange: function(index) {
		this.playlistConfig(index);
		if (this.renderjPlayer) {
			$(this.cssSelector.jPlayer).jPlayer("play");
		}
	},
	playlistNext: function() {
		var index = (this.current + 1 < this.playlist.length) ? this.current + 1 : 0;
		this.playlistChange(index);
	},
	playlistPrev: function() {
		var index = (this.current - 1 >= 0) ? this.current - 1 : this.playlist.length - 1;
		this.playlistChange(index);
	},
	playlistAdd: function(song) {
		this.playlist.push(song);
	},
	playlistUpdate: function(songs, curr) {
		same_song = songs[curr] == this.options[this.current]
		this.options = songs;
		if(!same_song) {
			this.current = curr;
			this.playlistConfig(this.current);
		} else {
			this.displayPlaylist();
		}
	},
	playlistPlay: function() {
		if(this.renderjPlayer && $(this.cssSelector.interface).data("jPlayer").status.paused) {
			$("#song-play-pause").click();
		}
	},
	playlistPause: function () {
		if(this.renderjPlayer && !$(this.cssSelector.interface).data("jPlayer").status.paused) {
			$("#song-play-pause").click();
		}	
	},
	playlistUpdateTime: function (seconds) {
		
	},
	playlistCurrent: function () {
		return this.playlist[this.current];
	}
};

function continueUpdatingButtons() {
	audioPlaylist.updateButtons();
	setTimeout("continueUpdatingButtons()", 200);
}