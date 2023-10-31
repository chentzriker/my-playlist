let content;
let clon;
let temp;

function showContent(i) {
    if (i === 2) {
        if (!checkValidtion()) {
            alert("one field or more is wrong")
            return
        }
    }
    content = document.getElementById("content")
    content.innerHTML = ""
    temp = document.getElementsByTagName("template")[i];
    clon = temp.content.cloneNode(true);
    console.log(clon)
    content.appendChild(clon);
}

function checkValidtion() {
    username = document.getElementById("Username").value
    password = document.getElementById("Password").value
    if (!username || !password) {
        return false
    }
    if (password.length < 5 || username.length < 4) {
        return false
    }
    return true
}

