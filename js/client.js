function recieveDataFromServer(strObj) {
    let fajax = (strObj);
    fajax.onload();
}

function sendHTMLEnterRequest(username, password,orderType) {
    //create new FAJAX and send it
    let onload = function () {
        if (this.status === 200) {
            changeHashId(JSON.parse(this.param).id);
            showContent(2);
            loadPlaylist();
        }
        else {
            alert("one field or more is wrong");
        }
    };
    createRequest(orderType, "users", "", onload, { "name": username, "password": password });
    //see if the server returnd that this user Exists or not
    //load the user page
}

function createRequest(orderType, location, userId, onload, param = undefined) {
    let request = new FXMLHttpRequest()
    request.open(orderType, "/my-playlist.il.API/" + location + "/" + userId);
    request.onload = onload;
    request.send(JSON.stringify(param));
}


function showSongForm() {
    document.getElementById("newSongForm").style.display = "flex";
    document.getElementById("addSong").style.display = "none";
}
function addSongToUserPlaylist() {
    event.preventDefault();
    document.getElementById("newSongForm").style.display = "none";
    document.getElementById("addSong").style.display = "block";
    let onload = function () {
        if (this.status === 200) {
            alert("your song was added successfully:) check out your updated playlist!!")
            loadPlaylist();
        }
        else {
            alert("something went wrong:(");
        }
    };
    const title = document.getElementById("title").value;
    const artist = document.getElementById("artist").value;
    const length = document.getElementById("length").value;
    const path = document.getElementById("file").value.replace("C:\\fakepath\\", "./songs/");;

    createRequest("POST", "playlists", parseInt(location.hash.slice(1)), onload, { "title": title, "artist": artist, "length": length, "path": path });
}