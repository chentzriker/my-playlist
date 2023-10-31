class DataBase {
    constructor(){
        this.users =JSON.parse(localStorage.getItem("users")) || {}
        this.playlists = JSON.parse(localStorage.getItem("playlists")) || {}
    }
    
}