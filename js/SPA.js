
let content;
let clon;
let temp;

function checkIfUserConected(){
    if (location.hash === ""){
        showContent(0)
    }
    else{
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
    let onload = function () {
        if (this.status === 200) {
            let list = this.responseText;
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
   createRequest("GET", "playlists", parseInt(location.hash.slice(1)), onload)

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

