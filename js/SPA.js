let content;
let clon;
let temp;

function checkIfUserConected() {
    if (location.hash === "") {
        showContent(0)
    }
    else {
        showContent(2)
        loadPlaylist();
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
    sendHTMLEnterRequest(username, password, "GET");
}

function signUp() {
    let username = document.getElementById("Username").value
    let password = document.getElementById("Password").value
    let confirm = document.getElementById("Confirm").value
    if (!checkValidtion(username, password) || password !== confirm) {
        alert("fill the fields correctly")
        return
    }
    sendHTMLEnterRequest(username, password, "POST");
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
                button1.classList.add(song.id, "small-button")
                button2.classList.add(song.id, "small-button")
                let li = document.createElement("li");
                li.innerHTML = "<div id=\"text\"><strong>" + song.title + "</strong>" + "<br/> artist: " + song.artist + "<br/> length: " + song.length + "<br/><div/>";
                li.innerHTML += "<audio controls><source src=\"" + song.path + "\" type=\"audio/mpeg\">file not available</audio><br/>";
                let buttonsDiv = document.createElement("div");
                buttonsDiv.appendChild(button1)
                buttonsDiv.appendChild(button2)
                li.appendChild(buttonsDiv)

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
            let li = e.target.parentElement.parentElement;
            li.remove();
        }
        else {
            alert("could not delete song")
        }
    }
    console.log(e.target.className)
    createRequest("DELETE", "playlists", parseInt(location.hash.slice(1)), onload, e.target.classList[0])
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
            alert("this feature is still in development. stay tuned!")
        }
    }
    console.log('parseInt(location.hash.slice(1)): ', parseInt(location.hash.slice(1)));
    createRequest("PUT", "playlists", parseInt(location.hash.slice(1)), onload);
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

