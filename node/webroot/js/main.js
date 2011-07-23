function log(msg) {
    $("#logs").append("<li>"+msg+"</li>");
}

$(document).ready(function(){
  now.roomID=window.location.pathname.split('/')[2]
  now.setup = function(playlist){
      $('div').text(playlist);
  }

  now.consoleOut = function(message){
    $('div').text(message)
    console.debug(message)
  }

  $("#send-button").click(function(){
    now.updatePlaylist($("#text-input").val());
    $("#text-input").val("");
  });
});
