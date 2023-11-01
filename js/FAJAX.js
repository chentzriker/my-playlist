class FXMLHttpRequest {
    constructor() {
        this.readyState = 0
        this.responseText = ""
    }
    open(orderType, url) {
        this.orderType = orderType
        this.url = url
    }
    send(param = "") {
        this.param = param;
        //send to network
        toServer(JSON.stringify(this))
    }
}