const firebaseConfig = {
    apiKey: "AIzaSyBgiMjmUUVhFPYzf5SFl2vDCwyD1dpyon4",
    authDomain: "kwitterproject-ae1db.firebaseapp.com",
    databaseURL: "https://kwitterproject-ae1db-default-rtdb.firebaseio.com",
    projectId: "kwitterproject-ae1db",
    storageBucket: "kwitterproject-ae1db.appspot.com",
    messagingSenderId: "22698403051",
    appId: "1:22698403051:web:2bf6a86d41fc9a3fca8aae"
};

// Initialize Firebase
firebaseConfig.initializeApp(firebaseConfig);

user = localStorage.getItem('user');
document.getElementById("heading").innerHTML = "Welcome" + user + "!!!";

function addRoom() {
    room_name = document.getElementById("room_name_input").value;
    localStorage.setItem("room_name", room_name);
    firebase.database().ref("/").child(room_name).update({
        purpose: "Adding Room"
    });
    console.log(room_name);
    window.location = "kwitter_page.html";
}

function getData() {
    firebase.database().ref("/").on("value", function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            console.log("room name :" + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div> <hr>";
            document.getElementById("output").innerHTML += row;
        });
    });
}

getData();

function redirectToRoomName(name) {
    console.log("room name" + name);
    localStorage.setItem("room name", name);
    window.location = "kwitter_page.html";
}