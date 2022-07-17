function addUser() {
    user = document.getElementById("user_name").value;
    localStorage.setItem("user", user);
    window.location = "kwitter_room.html";
}