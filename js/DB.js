class DataBase {
    constructor() {
        this.users = JSON.parse(localStorage.getItem("users")) || {idCount:0, users: []};
        this.playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    }

    getPlaylistById(id) {
        for (let playlist of this.playlists) {
            if (playlist.userId === id) {
                return playlist;
            }
        }
        return 404;
    }
    //this method adds a new song it gets to the user's playlist
    addSongToPlaylist(userId, song) {
        const USER_PLAYLIST = this.getPlaylistById(userId);
        if (USER_PLAYLIST === 404) {
            return 404;
        }
        USER_PLAYLIST.addOneToCountSongsId();
        song.id = USER_PLAYLIST.countSongsId;
        USER_PLAYLIST.push(song);
        localStorage.setItem("playlists", JSON.stringify(USER_PLAYLIST));
        return 200;
    }
    editSong(userId, songId, key, value) {
        const USER_PLAYLIST = this.getPlaylistById(userId);
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
        const USER_PLAYLIST = this.getPlaylistById(userId);
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
    // getPlaylistCountId(userId) {
    //     const USER_PLAYLIST = this.getPlaylistById(userId);

    // }
}
class Playlist {
    constructor(userId, _countSongsId = 0, songs = []) {
        this.userId = userId;
        this._countSongsId = _countSongsId;
        this.songs = songs;
    }
    get countSongsId() {
        return this._countSongsId;
    }
    addOneToCountSongsId() {
        this._countSongsId++;
    }
}

DB = new DataBase();