
let content;
let clon;
let temp;

function checkIfUserConected() {
    if (location.hash === "") {
        showContent(0)
    }
    else {
        showContent(2)
    }
}
function showContent(i) {
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
function loadPlaylist() {
    const UL = document.getElementById("playlist-container");
    UL.innerHTML = "";
    let onload = function () {
        if (this.status === 200) {
            let list = this.responseText;
            for (let song of list) {
                let button1 = document.createElement("button")
                let button2 = document.createElement("button")
                button1.addEventListener("click", removeSong)
                button2.addEventListener("click", editSong)
                button1.textContent = "remove"
                button2.textContent = "edit"
                button1.classList.add(song.id)
                button2.classList.add(song.id)
                let li = document.createElement("li");
                li.innerHTML = "<strong>" + song.title + "</strong>" + "<br/> artist: " + song.artist + "<br/> legth: " + song.length + "<br/>";
                li.appendChild(button1)
                li.appendChild(button2)
                UL.appendChild(li);
            }
        }
        else {
            alert("somthing went wrong")
        }
    }
    createRequest("GET", "playlists", parseInt(location.hash.slice(1)), onload)

}
function removeSong(e) {
    let onload = function () {
        if (this.status === 200) {
            let li = e.target.parentElement
            li.remove
        }
        else {
            alert("could not delete song")
        }
    }
    createRequest("DELETE", "playlists", parseInt(location.hash.slice(1)), onload, e.className)
}
function editSong(e) {
    //should get a key and value to change
    //then pass it with param in createRequest
    //then when it come back to change the innerHTML of the li to the new parameters
    //according to what is in param
    let onload = function () {
        if (this.status === 200) {
            let li = e.target.parentElement
            li.innerHTML = ""
        }
        else {
            alert("could not edit song")
        }
    }
    createRequest("PUT", "playlists", parseInt(location.hash.slice(1)), onload)
}

function logOut() {
    const UL = document.getElementById("playlist-container");
    UL.innerHTML = "";
    location.hash = ""
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

function changeHashId(id) {
    let hash = location.hash = "";
    window.location.hash += id;
}

