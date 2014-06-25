$(document).ready(function() {
    now.someoneWantsToBeThePlayer = function(clientId) {
        var accept = confirm("Someone wants to be the new Player, do you agree on not being the Player anymore?");
        if (accept) {
            now.changeThePlayerTo(clientId);
        }
    }

    now.youAreThePlayerNow = function() {
        // Do stuff that make you the player now
        audioPlaylist.playlistEnable();
    }

    now.youAreTheCurrentPlayer = function() {
        // Do stuff that say you're the current player
        if (!audioPlaylist.allowedToPlay) {
            audioPlaylist.playlistEnable();
        }
    }

    now.youAreNotTheCurrentPlayer = function() {
        // Do stuff that say you're not the current player
        if (audioPlaylist.allowedToPlay) {
            audioPlaylist.playlistDisable();
        }
    }

    $("#become-player").click(function () {
        now.iWantToBeThePlayer();
    });
});
