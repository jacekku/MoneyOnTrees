class Inventory{
    constructor(){
        this.button=new Button(620,10,width-620-10,600)
        this.items=[]
    }
    show(){
        fill(255)
        let bound=STYLE.inventory
        rect(bound.x,bound.y,bound.width,bound.height)
        rect(620,50,width-620-10,600-40)
        fill(0)
        text("INVENTORY",620+((width-620-10)/2),textSize())

        push()
        translate(620,50)
        textSize(20)
        textAlign(LEFT)
        for(const item of this.items){
            item.showInInventory()
            translate(0,STYLE.itemHeightInInventory)
        }
        pop()
    }
    onClick(){}
    isClicked(){
        if(this.button.isClicked())this.onClick()
    }
}




