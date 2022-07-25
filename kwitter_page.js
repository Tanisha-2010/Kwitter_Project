//YOUR FIREBASE LINKS
const firebaseConfig = {
    apiKey: "AIzaSyBgiMjmUUVhFPYzf5SFl2vDCwyD1dpyon4",
    authDomain: "kwitterproject-ae1db.firebaseapp.com",
    databaseURL: "https://kwitterproject-ae1db-default-rtdb.firebaseio.com",
    projectId: "kwitterproject-ae1db",
    storageBucket: "kwitterproject-ae1db.appspot.com",
    messagingSenderId: "22698403051",
    appId: "1:22698403051:web:0095719debcac9bbca8aae"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user = localStorage.getItem("user");
room_name = localStorage.getItem("room name");
console.log(room_name);

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data["name"];
                message = message_data["message"];
                likes = message_data["likes"];
                name_with_tag = "<h4>" + name + "<img src='tick.png' class='user_tick'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                likes_with_tag = "<button id='" + firebase_message_id + "' class='btn btn-warning' value=" + likes + " onclick='addLikes(this.id)' >";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> like:" + likes + "</span> </button>";
                row = name_with_tag + message_with_tag + likes_with_tag + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function addLikes(message_id) {
    console.log("clicked on like button :" + message_id);
    likes = document.getElementById(message_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        likes: updated_likes
    });
}

function send() {
    message = document.getElementById("inpt_msg").value;

    firebase.database().ref(room_name).push({
        likes: 0,
        message: message,
        name: user
    });

    document.getElementById("inpt_msg").value = "";
}

function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem('room name');
    window.location = "index.html";
}