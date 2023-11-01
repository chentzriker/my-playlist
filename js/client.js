function sendHTMLLoginRequest(username, password) {
    //create new FAJAX and send it
    let onload = () => {
        if (this.status === 200) {
            showContent(2)
        }
        else {
            alert("one field or more is wrong")

        }
    };
    createRequest("POST", "users", "", onload, JSON.stringify({ "name": username, "password": password }));
    //see if the server returnd that this user Exists or not
    //load the user page
}

function createUserIdRequest(orderType, location, userId, onload, toChange = undefined) {
    let request = new FXMLHttpRequest()
    request.open(orderType, "/my-playlist.il.API/" + location + "/" + userId);
    request.onload = onload;
    request.send(JSON.stringify(toChange));
}