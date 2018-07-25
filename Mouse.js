class Mouse {
    constructor() {
        this.action
        this.busy = false
        this.caller
        this.actionEndsAt
    }
    setAction(action) {
        this.action = action
    }
    /**
     * 
     * @param {object} caller object starting the action, used to call the action after the time passes
     * @param {number} duration how long the action takes to complete in MS
     */
    startAction(caller, callback, duration,...args) {
        if (this.busy) return false
        this.actionStartedAt = Date.now()
        this.busy = true
        this.caller = caller
        this.callback = callback
        this.args=args
        this.actionEndsAt = this.actionStartedAt + duration

    }
    isActionComplete() {
        if (this.busy && Date.now() > this.actionEndsAt) return true
        return false
    }
    actionComplete() {
        this.callback.call(this.caller,...this.args)
        this.busy = false
        this.callback=null
        this.caller=null
    }
    actionCancelled() {

    }
    tick() {
        if (this.isActionComplete()) {
            this.actionComplete()
        }
    }


    show() {
        fill(0)
        if (mouseObject.action && mouseObject.action.image) {
            image(mouseObject.action.image, mouseX, mouseY, 40, 40)
        }
        rect(mouseX, mouseY, 2, 10)
        rect(mouseX, mouseY, 10, 2)
        if(this.busy){
            let duration=this.actionEndsAt-this.actionStartedAt
            let stepInRadians=((2*PI)/duration)
            
            arc(mouseX+20,mouseY+20,40,40,-PI/2,
                (duration-(this.actionEndsAt-Date.now()))*stepInRadians-(PI/2)
                ,PIE)
        }
    }
}