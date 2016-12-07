/*****BOARD NOTIFICATION FUNCTIONALITY *****/

//turn tracker notification
var turnTrackerDiv = document.getElementById("turn_tracker");

var turnTracker = function(currPlayer) {
  if(currPlayer === "white") {
    turnTrackerDiv.innerText = "It is white's turn.";
  } else {
    turnTrackerDiv.innerText = "It is black's turn."
  }
}

//general notifications
var notificationDiv = document.getElementById("game_notification");

notificationDiv.onclick = function(event) {
  notificationDiv.innerText = "";
};

var notification = function(string) {
  if(string.includes("Game over")) {
    notificationDiv.setAttribute("class", "game_over_notification");
  } else {
    notificationDiv.setAttribute("class", "normal_notification");
  }

  notificationDiv.innerText = string;
}

var closeNotification = function() {
  notificationDiv.innerText = "";
}
