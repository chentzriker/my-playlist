class DataBase {
    constructor() {
        this.users = JSON.parse(localStorage.getItem("users")) || { idCount: 1, users: [] };
        this.playlists = JSON.parse(localStorage.getItem("playlists")) || [];
        if (this.users[0] === undefined) {
            this.addUser(new User("chen", "123456"));
        }
    }

    getUsers() {
        return (this.users).users;
    }
    //put an id to the new user and add a user to the storage 
    addUser(obj) {
        let users = this.users;
        let userId = users["idCount"];
        obj.id = userId;
        let playlists = this.playlists;
        let newPlaylist = new Playlist(userId);
        playlists.push(newPlaylist);
        users.users.push(obj);
        users["idCount"] = users["idCount"] + 1;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("playlists", JSON.stringify(playlists));
        return 200;
    }
    getUserId(name, password) {
        //finds the user and returns its id.
        const USERS = this.getUsers();
        for(let user of USERS) {
            if(user.name === name && user.password === password) {
                return user.id;
            }
        }
        return 404;
    }

    editUser(userId, key, value) {
        let users = this.users;
        for (const element of users.users) {
            if (element.id === userId) {
                element[key] === value;
                localStorage.setItem("users", JSON.stringify(users));
                return 200;
            }
        }
        return 404
    }

    deleteUser(userId) {
        let users = this.users
        for (let i = 0; i < users.users.length; i++) {
            if (users.users[i].id === userId) {
                users.users.splice(i, 1);
                return 200;
            }
        }
        return 404
    }
    getSongsListById(id) {
        for (let playlist of this.playlists) {
            if (playlist.userId === id) {
                return playlist.songs;
            }
        }
        return 404;
    }
    getPlaylistObj(id) {
        for (let playlist of this.playlists) {
            if (playlist.userId === id) {
                return playlist;
            }
        }
        return 404;
    }
    //this method adds a new song it gets to the user's playlist
    addSongToPlaylist(userId, song) {
        const USER_SONGS = this.getSongsListById(userId);
        console.log('USER_SONGS: ', USER_SONGS);
        const USER_PLAYLIST = this.getPlaylistObj(userId);
        console.log('USER_PLAYLIST: ', USER_PLAYLIST);
        console.log(this);
        if (USER_PLAYLIST === 404 || USER_SONGS === 404) {
            return 404;
        }
        USER_PLAYLIST.countSongsId++;
        song.id = USER_PLAYLIST.countSongsId;
        console.log('USER_PLAYLIST.countSongsId: ', USER_PLAYLIST.countSongsId);
        USER_SONGS.push(song);
        console.log('USER_SONGS: ', USER_SONGS);
        localStorage.setItem("playlists", JSON.stringify(USER_PLAYLIST));
        return 200;
    }
    editSong(userId, songId, key, value) {
        const USER_PLAYLIST = this.getSongsListById(userId);
        let success = false;
        if (USER_PLAYLIST === 404) {
            return 404;
        }
        for (let song of USER_PLAYLIST) {
            if (song.id === songId) {
                song[key] = value;
                success = song;
            }
        }
        if (!success) {
            return 404;
        }
        else {
            localStorage.setItem("playlists", JSON.stringify(USER_PLAYLIST));
            return success;
        }
    }
    deleteSong(userId, songId) {
        const USER_PLAYLIST = this.getSongsListById(userId);
        let index = -1;
        if (USER_PLAYLIST === 404) {
            return 404;
        }
        for (let i = 0; i < USER_PLAYLIST.length - 1; i++) {
            if (USER_PLAYLIST[i].id === songId) {
                index = i;
            }
        }
        if (index = -1) {
            return 404;
        }
        else {
            USER_PLAYLIST.splice(index, 1);
            localStorage.setItem("playlists", JSON.stringify(USER_PLAYLIST));
            return 202;
        }
    }

}
class Playlist {
    constructor(userId) {
        this.userId = userId;
        this.countSongsId = 0;
        this.songs = [];
    }


}

DB = new DataBase();