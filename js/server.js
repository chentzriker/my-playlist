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
class User{
    constructor(name,password){
        this.name = name
        this.password = password
    }    
}    
class song{
    constructor(title, artist, length){
        this.title = title;
        this.artist = artist;
        this.length = length;
    }    
}    
class Server{
    constructor(){};
    getUsersArray() {
        return DB.getUsers();
    }
    addUserToDB(name, password) {
        ///FAJAX!! NEEDS TO BE CHANGED LATER!!
        const ans = DB.addUser(new User(name, password));
        if (ans === 404){
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
}    




