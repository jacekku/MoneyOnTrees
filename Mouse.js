class Mouse{
    constructor(){
        this.action
        this.busy=false
    }
    setAction(action){
        this.action=action
    }
    startAction(action,duration){
        if(this.busy)return false
    }




    show(){
        fill(0)
        if (mouseObject.action && mouseObject.action.image) {
            image(mouseObject.action.image, mouseX, mouseY, 40, 40)
        }
        rect(mouseX, mouseY, 2, 10)
        rect(mouseX, mouseY, 10, 2)
    }
}