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
        this.param = param
        toServer(this.param || { orderType: this.orderType, url: this.url })
    }
}