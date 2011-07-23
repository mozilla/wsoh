  var playlist;
    function init() {
        audioPlaylist = new Playlist("", [
                    {"track":6,"artistID":202,"songName":"California King Bed","albumID":5224577,"albumName":"Loud (Deluxe Edition)","mp3":"http://localhost:4567/songs/28645456/play/","artworkURL":"http://static.a.gs-cdn.net/webincludes/images/default/album_250.png","artistName":"Rihanna","songID":28645456},
                    {"track":0,"artistID":202,"songName":"S&M","albumID":152188,"albumName":"Rihanna","mp3":"http://localhost:4567/songs/28869399/play/","artworkURL":"http://static.a.gs-cdn.net/webincludes/images/default/album_250.png","artistName":"Rihanna","songID":28869399},
                    {"track":8,"artistID":202,"songName":"Rude Boy","albumID":3525047,"albumName":"Rated R","mp3":"http://localhost:4567/songs/23559465/play/","artworkURL":"http://beta.grooveshark.com/static/amazonart/m3525047.jpg","artistName":"Rihanna","songID":23559465},
                    {"track":4,"artistID":599869,"songName":"Blow","albumID":5478285,"albumName":"CANNIBAL","mp3":"http://localhost:4567/songs/28444991/play/","artworkURL":"http://static.a.gs-cdn.net/webincludes/images/default/album_250.png","artistName":"Kesha","songID":28444991},
                    {"track":0,"artistID":526664,"songName":"Party Rock Anthem","albumID":5802921,"albumName":"Party Rock Anthem - Single","mp3":"http://localhost:4567/songs/29886729/play/","artworkURL":"http://static.a.gs-cdn.net/webincludes/images/default/album_250.png","artistName":"LMFAO","songID":29886729}
                ], {});
        audioPlaylist.playlistInit(false); // Parameter is a boolean for autoplay.

        new MBP.fastButton(document.getElementById('playlist'), function(e) {
            document.getElementById('main').className = "disabled";
            document.getElementById('song-list').className = "";
            document.getElementById('add-song').className = "disabled";
            myScroll = new iScroll('song-list-wrapper');
        });

        new MBP.fastButton(document.getElementById('now-playing'), function(e) {
            document.getElementById('main').className = "";
            document.getElementById('song-list').className = "disabled";
            document.getElementById('add-song').className = "disabled";
        });

        new MBP.fastButton(document.getElementById('search'), function(e) {
            document.getElementById('main').className = "disabled";
            document.getElementById('song-list').className = "disabled";
            document.getElementById('add-song').className = "";
            myScroll = new iScroll('add-song-wrapper');
        });


        new MBP.fastButton(document.getElementById('song-next'), function() {
            now.nextSong();
        });
        new MBP.fastButton(document.getElementById('song-previous'), function() {
            now.previousSong();
        });
        new MBP.fastButton(document.getElementById('song-play-pause'), function(e) {
            if (e.target.className == "paused") {
                now.play();
            }
            else {
                now.pause();
            }
        });
        addSwipeListener(document.getElementById('detect-swipe'), function(e) {
            if (e.direction=="right") {
                previous();
            } else {
                next();
            }
        });

        var fld = document.getElementById('song-search-box');
        if (fld.addEventListener)
        fld.addEventListener('keyup',eventkeyup,false );


    }

    var eventkeyup = function () {

        var timer;
        var $searchResults = document.getElementById('search-results');
        var $searchBox = document.getElementById('song-search-box');

        jQuery.get('http://localhost:4567/search?q='+search, function (response) {
                response = $.parseJSON(response);
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

            }, 300);
        $searchResults.html("Searching");
    }



    function addSwipeListener(el, listener)
    {
     var startX;
     var dx;
     var direction;

     function cancelTouch()
     {
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      startX = null;
      startY = null;
      direction = null;
     }

     function onTouchMove(e)
     {
      if (e.touches.length > 1)
      {
       cancelTouch();
      }
      else
      {
       dx = e.touches[0].pageX - startX;
       var dy = e.touches[0].pageY - startY;
       if (direction == null)
       {
        direction = dx;
        e.preventDefault();
       }
       else if ((direction < 0 && dx > 0) || (direction > 0 && dx < 0) || Math.abs(dy) > 15)
       {
        cancelTouch();
       }
      }
     }

     function onTouchEnd(e)
     {
      cancelTouch();
      if (Math.abs(dx) > 50)
      {
       listener({ target: el, direction: dx > 0 ? 'right' : 'left' });
      }
     }

     function onTouchStart(e)
     {
      if (e.touches.length == 1)
      {
       startX = e.touches[0].pageX;
       startY = e.touches[0].pageY;
       el.addEventListener('touchmove', onTouchMove, false);
       el.addEventListener('touchend', onTouchEnd, false);
      }
     }

     el.addEventListener('touchstart', onTouchStart, false);
    }
    /mobile/i.test(navigator.userAgent) && !location.hash && setTimeout(function () {  if (!pageYOffset) window.scrollTo(0, 1);}, 1000);
