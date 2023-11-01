class Network {
    constructor(){};
    toServer(jsonFajax) {
        setTimeout(this.sendStringToServer, 1000, jsonFajax); 
    }
    sendStringToServer(jsonFajax){
        SERVER.analyzeRequest(jsonFajax);
    }
    toClient(jsonFajax){
        setTimeout(this.sendStringToServer, 1000, jsonFajax); 

        recieveDataFromServer(jsonFajax);
    };
    sendStringToClient(jsonFajax)
}
const NET = new Network();