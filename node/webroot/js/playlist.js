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
	
	this.allowedToPlay = false;
	this.renderjPlayer = instance && instance != "";
	
	if (this.renderjPlayer && this.allowedToPlay) {
		$(this.cssSelector.jPlayer).jPlayer(this.options);
	}
	
	this.displayPlaylist();
	
	if(this.renderjPlayer) {
		$(".jp-previous").click(function() {
			// self.playlistPrev();
			now.previousSong();
			// $(this).blur();
			return false;
		});

		$(".jp-next").click(function() {
			// self.playlistNext();
			now.nextSong();
			// $(this).blur();
			return false;
		});
		var volume_slider = $('#volume-slider')
		volume_slider.mouseup(function(){
		    now.updateVolume(volume_slider.val()/100)
		});
		$("#song-play-pause").click(function () {
			if(self.renderjPlayer) {
				if($(this).hasClass('paused')) {
					now.play();
				} else {
					now.pause();
				}
			}
			return false;
		});
	
		$("#song-list .song-listing").live("click", function () {
			self.playlistChange(parseInt($(this).attr('data-index'), 10));
			now.updatePlaylist(JSON.stringify({ playlist: self.playlist, current: self.current }));
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
		out = "";
		if(!this.renderjPlayer) {
			document.getElementsByClassName("current")[0].style = "background #000 url('" + this.playlist[this.current].artworkURL + "')";
			document.getElementsByClassName("current")[1].style = "background #000 url('" + this.playlist[this.current].artworkURL + "')";
			document.getElementsByClassName("current")[2].style = "background #000 url('" + this.playlist[this.current].artworkURL + "')";
		}
		this.updateButtons();
	},
	updateButtons: function() {
		if(this.renderjPlayer && $(this.cssSelector.interface).data("jPlayer")) {
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
		if(this.playlist.length > 0) {
			if (this.renderjPlayer) {
				$(this.cssSelector.jPlayer).jPlayer("setMedia", this.playlist[parseInt(this.current, 10)]);
				$("#song-album-art").attr('src', this.playlist[parseInt(this.current, 10)].artworkURL);
			}
			document.getElementById("song-artist").innerText = this.playlist[parseInt(this.current, 10)].artistName;
			document.getElementById("song-album").innerText = this.playlist[parseInt(this.current, 10)].albumName;
			document.getElementById("song-name").innerText = this.playlist[parseInt(this.current, 10)].songName;
		}
	},
	playlistChange: function(index) {
		this.playlistConfig(index);
		if (this.renderjPlayer) {
			$(this.cssSelector.jPlayer).jPlayer("play");
		}
	},
	playlistNext: function() {
		var index = (this.current + 1 < this.playlist.length) ? this.current + 1 : 0;
		if(!this.renderjPlayer) {
			document.getElementsByClassName('current')[0].setAttribute('class','off-left album-art');
	  		document.getElementsByClassName('next')[0].setAttribute('class','current album-art');
	  		document.getElementsByClassName('next2nd')[0].setAttribute('class','next album-art');
	  		document.getElementsByClassName('off-right')[0].setAttribute('class','next2nd album-art');
		}
		this.playlistChange(index);
	},
	playlistPrev: function() {
		var index = (this.current - 1 >= 0) ? this.current - 1 : this.playlist.length - 1;
		if(!this.renderjPlayer) {
			document.getElementsByClassName('next2nd')[0].setAttribute('class','off-right album-art')
			document.getElementsByClassName('next')[0].setAttribute('class','next2nd album-art')
			document.getElementsByClassName('current')[0].setAttribute('class','next album-art')
			document.getElementsByClassName('off-left')[0].setAttribute('class','current album-art');
		}
		this.playlistChange(index);
	},
	playlistAdd: function(song) {
		this.playlist.push(song);
		now.updatePlaylist(JSON.stringify({ playlist: this.playlist, current: this.current }));
	},
	playlistUpdate: function(songs, curr) {
		same_song = songs[curr] == this.options[this.current]
		this.playlist = songs;
		if(!same_song) {
			this.current = curr;
			this.playlistConfig(this.current);
		} else {
			this.displayPlaylist();
		}
	},
	playlistPlay: function() {
		if(this.renderjPlayer && $(this.cssSelector.interface).data("jPlayer") && $(this.cssSelector.interface).data("jPlayer").status.paused) {
			if($(this.cssSelector.interface).data("jPlayer")) {
				$(this.cssSelector.interface).jPlayer("play");
			}
			$("#song-play-pause").removeClass('paused');
		} else {
			document.getElementById('song-play-pause').className = "";
		}
	},
	playlistPause: function () {
		if(this.renderjPlayer && $(this.cssSelector.interface).data("jPlayer") && !$(this.cssSelector.interface).data("jPlayer").status.paused) {
			if($(this.cssSelector.interface).data("jPlayer")) {
				$(this.cssSelector.interface).jPlayer("pause");
			}
			$("#song-play-pause").addClass('paused');
		} else {
			document.getElementById('song-play-pause').className = "paused";
		}
	},
	playlistUpdateTime: function (data) {
		song = this.playlistCurrent();
		if(this.renderjPlayer) {
			$("#song-so-far").text(data.sofar);
			$("#song-duration").text(data.duration);
			$("#song-progress-played").css({ 'width':  data.progress });
		}
	},
	playlistCurrent: function () {
		return this.playlist[this.current];
	},
	playlistEnable: function () {
		this.allowedToPlay = true;
		if(this.renderjPlayer) {
			$(this.cssSelector.jPlayer).jPlayer(this.options);
		}
		this.displayPlaylist();
	},
	playlistDisable: function () {
		if(this.renderjPlayer && $(this.cssSelector.interface).data('jPlayer')) {
			$(this.cssSelector.interface).jPlayer("destroy");
		}
		this.allowedToPlay = false;
	}
};

function continueUpdatingButtons() {
	if(audioPlaylist.renderjPlayer && audioPlaylist.allowedToPlay) {
		audioPlaylist.updateButtons();
	}
	setTimeout("continueUpdatingButtons()", 200);
};