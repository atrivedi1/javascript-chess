var notificationDiv = document.getElementById("notification");

var notification = function(string) {
  notificationDiv.innerText = string;
}

notification.onclick = function(event) {
  notificationDiv.innerText = "";
};
