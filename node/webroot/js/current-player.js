$(document).ready(function() {
    now.someoneWantsToBeThePlayer = function(clientId) {
        log("someoneWantsToBeThePlayer: " + clientId);
        var accept = confirm("Someone wants to be the new Player, do you agree on not being the Player anymore?");
        if (accept) {
            now.changeThePlayerTo(clientId);
        }
    }

    now.youAreThePlayerNow = function() {
        log("youAreThePlayerNow");
        // Do stuff that make you the player now
        alert("Yeah I'm the player now!");
    }

    now.youAreTheCurrentPlayer = function() {
        log("youAreTheCurrentPlayer");
        // Do stuff that say you're the current player
        alert("I am the current player.");
    }

    now.youAreNotTheCurrentPlayer = function() {
        log("youAreNotTheCurrentPlayer");
        // Do stuff that say you're not the current player
        alert("I am NOT the current player.");
    }

    $("#become-player").click(function () {
        log("clicked iWantToBeThePlayer");
        now.iWantToBeThePlayer();
    });
});
