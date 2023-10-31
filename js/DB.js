class DataBase {
    constructor() {
        this.users = JSON.parse(localStorage.getItem("users")) || {}
        this.playlists = JSON.parse(localStorage.getItem("playlists")) || {}
    }

    getUsers() {
        return (this.users).users
    }
    //put an id to the new user and add a user to the storage 
    addUser(obj) {
        let users = this.users
        let userId = users["idCount"]
        obj.id = userId
        let playlists = this.playlists
        let newPlaylist = new Playlist(userId, 0, [])
        playlists.push(newPlaylist)
        users.users.push(obj)
        users["idCount"] = users["idCount"] + 1
        localStorage.setItem("users", JSON.stringify(users))
        return 200
    }

    editUser(userId, key, value) {
        let users = this.users
        for (const element of users.users) {
            if (element.id === userId) {
                element[key] === value
                localStorage.setItem("users", JSON.stringify(users))
                return 200
            }
        }
        return 404
    }

    deleteUser(userId) {
        let users = this.users
        for (let i = 0; i < users.users.length; i++) {
            if (users.users[i].id === userId) {
                users.users.splice(i, 1)
                return 200
            }
        }
        return 404
    }
}