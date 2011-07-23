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

    $("#become-player").click(function () {
        log("clicked iWantToBeThePlayer");
        now.iWantToBeThePlayer();
    });
});
