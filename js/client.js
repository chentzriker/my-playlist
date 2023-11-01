function recieveDataFromServer(strObj) {
    let fajax = (strObj);
    fajax.onload();
}

function sendHTMLLoginRequest(username, password) {
    //create new FAJAX and send it
    let onload = () => {
        console.log(this)
        if (this.status === 200) {
            showContent(2)
        }
        else {
            alert("one field or more is wrong")
        }
    };
    createRequest("POST", "users", "", onload, { "name": username, "password": password });
    //see if the server returnd that this user Exists or not
    //load the user page
}

function createRequest(orderType, location, userId, onload, param = undefined) {
    let request = new FXMLHttpRequest()
    request.open(orderType, "/my-playlist.il.API/" + location + "/" + userId);
    request.onload = onload;
    request.send(JSON.stringify (param));
}