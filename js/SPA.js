
let content;
let clon;
let temp;

function showContent(i) {
    content = document.getElementById("content");
    content.innerHTML = "";
    temp = document.getElementsByTagName("template")[i];
    clon = temp.content.cloneNode(true);
    document.getElementById("content").appendChild(clon);
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