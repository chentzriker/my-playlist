
let content;
let clon;
let temp;

function showContent(i) {
    // if (i === 2) {
    //     //checks if the fields are valid before going to the server
    //     if (!checkValidtion()) {
    //         alert("one field or more is wrong")
    //         return
    //     }
    // }
    content = document.getElementById("content")
    content.innerHTML = ""
    temp = document.getElementsByTagName("template")[i];
    clon = temp.content.cloneNode(true);
    document.getElementById("content").appendChild(clon);
    console.log(clon)
    content.appendChild(clon);
}

function login() {
    let username = document.getElementById("Username").value
    let password = document.getElementById("Password").value
    if (!checkValidtion(username, password)) {
        alert("one field or more is wrong")
        return
    }
    //* create new FAJAX and send it
    let request = new FXMLHttpRequest()
    // request.open("POST", "my-playlist.il/users")
    // request.onload  =function(){}
    // request.send(JSON.stringify({ name: username, password: password }))
    //* see if the server returnd that this user Exists or not
    //load the user page
    showContent(2)
}

//adds the user's playlist items to the playlist template tag 
function loadPlaylist(list) {
    const UL = document.getElementById("playlist-container");
    for (let song of list) {
        let li = document.createElement("li");
        li.innerHTML = song.title + "<br/> artist: " + song.artist + "<br/.> legth: " + song.length;
        UL.appendChild(li);
    }
}

function logOut() {
    const UL = document.getElementById("playlist-container");
    UL.innerHTML = "";
    showContent(0);
}

function checkValidtion(username, password) {

    if (!username || !password) {
        return false
    }
    if (password.length < 5 || username.length < 4) {
        return false
    }
    return true
}

