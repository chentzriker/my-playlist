sendHTMLLoginRequest(username,password){
    //create new FAJAX and send it
    let request = new FXMLHttpRequest()
    request.open("POST", "my-playlist.il/users")
    request.onload  =function(){}
    request.send(JSON.stringify({ name: username, password: password }))
    //see if the server returnd that this user Exists or not
    //load the user page
    showContent(2)
}