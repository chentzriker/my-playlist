
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
    sendHTMLLoginRequest(username, password);
}

//adds the user's playlist items to the playlist template tag 
function loadPlaylist(list) {
    let onload = function () {
        if (this.status !== 200) {
            alert("somthing went wrong")
            return
        }
    }
    let request = createRequest("GET", "playlists", location.hash.slice(0, 1), onload)
    const UL = document.getElementById("playlist-container");
    if (request.status === 200) {
        let list = request.responseText
        for (let song of list) {
            let li = document.createElement("li");
            li.innerHTML = song.title + "<br/> artist: " + song.artist + "<br/.> legth: " + song.length;
            UL.appendChild(li);
        }
    }
    else {
        alert("somthing went wrong")
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

