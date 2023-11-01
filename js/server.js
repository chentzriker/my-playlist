//~ DATABASE API: ~
// database name: DB

// user related methods:
// * getUsers() - returns an array with all the users.
// * addUser(obj) - gets a user object and adds it to the database. if fails, returns 404,
// otherwise - returns 200
// * editUser(userId, key, value) - changes the value of the key that belongs to the user with 
// the given id. if fails, returns 404, otherwise - returns 200.
// * deleteUser(userId) - deletes the the user with 
// the given id. if fails, returns 404, otherwise - returns 200.

// song / playlist related methods:
// * getSongsListById(id) - returns the user's playlist by their id. if fails, returns 404.
// * getPlaylistObj(id) - returns the user's playlist OBJECT (which means, an object with the user's id, 
// id count for the songs and playlist array) by their id. if fails, returns 404.
// * addSongToPlaylist(userId, song) - adds a given song to the user's playlist with their given id. 
// if fails, returns 404. otherwise, 200.
// * editSong(userId, songId, key, value)
// * deleteSong(userId, songId) 
class User {
    constructor(name, password) {
        this.name = name
        this.password = password
    }
}
class song {
    constructor(title, artist, length) {
        this.title = title;
        this.artist = artist;
        this.length = length;
    }
}
class Server {
    constructor() { };
    analyzeRequest(req) {
        let urlArr = req.url.split("/")
        if (req.orderType === "POST") {
            if (urlArr[2] === "users") {
                if (checkValidtion(req.param.name, req.param.password)) {
                    try {
                        req.status = checkUserExistence(getUsersArray(), req.param)
                    }
                    catch (e) {
                        req.status = 404
                        req.responseText = e.message
                    }
                }
            }
        }
        NET.toClient(req)
    }
    checkValidtion(username, password) {

        if (!username || !password) {
            return false
        }
        if (password.length < 5 || username.length < 4) {
            return false
        }
        return true
    }
    getUsersArray() {
        return DB.getUsers();
    }

    checkUserExistence(users, client) {
        if (users.length === 0) {
            throw new Error("no users")
        }
        for (let x of users) {
            if (x.name === client.name && x.password === client.password) {
                return 200
            }
            else {
                throw new Error("wrong user name or password")
            }

        }
    }
    addUserToDB(name, password) {
        ///FAJAX!! NEEDS TO BE CHANGED LATER!!
        const ans = DB.addUser(new User(name, password));
        if (ans === 404) {
            //change fajax textResponse
        }
        return ans;
    }
    editExsistingUserInDB(userId, key, value) {
        ///FAJAX!! NEEDS TO BE CHANGED LATER!!
        const ans = DB.editUser(userId, key, value);
        if (ans === 404) {
            //change fajax textResponse to error
        }
        return ans;//????? needs to return fajax
    }
    addSongToPlaylist() {

    }
}
const SERVER = new Server();


