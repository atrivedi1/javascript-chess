var notificationDiv = document.getElementById("notification");

var notification = function(string) {
  notificationDiv.innerText = string;
}

var closeNotification = function() {
  notificationDiv.innerText = "";
}

notificationDiv.onclick = function(event) {
  notificationDiv.innerText = "";
};
