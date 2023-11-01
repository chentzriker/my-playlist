//~ DATABASE API: ~
// database name: DB

// user related methods:
// * getUsers() - returns an array with all the users.
// * getUserId(name, password) - returns the given user's id. warning: user has to exist! if not, returns 404.
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
class Song {
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
                console.log("got here");
                let obj = JSON.parse(req.param)
                if (this.checkValidtion(obj.name, obj.password)) {
                    try {
                        req.status = this.checkUserExistence(this.getUsersArray(), obj)
                        obj.id = DB.getUserId(obj.name, obj.password);
                    }
                    catch (e) {
                        req.status = 404
                        req.responseText = e.message
                    }
                }
                req.param = JSON.stringify(obj);
            }
            else {
                let obj = JSON.parse(req.param);
                req.status = this.addSongToPlaylistDB(urlArr[3], obj.title, obj.artist, obj.length);
                if (req.status === 404) {
                    req.responseText = "ERROR! failed to add song. playlist does not exist. contact customer service for help."
                }
                // else {
                //     // obj.id = DB.getSongID()

                // }
            }
        }
        else if (req.orderType === "GET") {
            if (urlArr[2] === "playlists") {
                if (this.getplaylist(urlArr[3]) === 404) {
                    req.status = 404
                }
                else {
                    req.responseText = this.getplaylist(urlArr[3])
                    req.status = 200
                }
            }
        }
        else if(req.orderType === "DLETE"){
            if (urlArr[2] === "playlists"){
                this.removeSongFromPlaylist(parseInt(urlArr[2]),parseInt(req.param))
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
            if (x.name == client.name && x.password == client.password) {
                return 200
            }
        }
        throw new Error("wrong user name or password")
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
    getplaylist(id) {
        return DB.getSongsListById(id);
    }
    addSongToPlaylistDB(userId, title, artist, length) {
        return DB.addSongToPlaylist(userId, new Song(title, artist, length));
    }
    removeSongFromPlaylist(userId,songId) {
        return DB.deleteSong(userId,songId)
    }
    editSong() {

    }
}
const SERVER = new Server();


