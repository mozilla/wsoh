$(document).ready(function() {
    $("#join").click(function() {
        console.log("clickclick");
        var room = $("#room").val();
        window.location = "/playlist/" + room;
    });
});
