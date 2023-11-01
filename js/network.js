class Network {
    constructor(){};
    toServer(jsonFajax) {
        setTimeout(this.sendStringToServer, 1000, jsonFajax); 
    }
    sendStringToServer(jsonFajax){
        console.log("was here");
        SERVER.analyzeRequest(jsonFajax);
    }
    toClient(jsonFajax){
        setTimeout(this.sendStringToClient, 1000, jsonFajax); 
    };
    sendStringToClient(jsonFajax){
        recieveDataFromServer(jsonFajax);
    }
}
const NET = new Network();