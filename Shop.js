class Shop{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.items=[
            items.oak_saplings
            ,items.oak_log
            ,items.pine_saplings
            ,items.pine_log
            ]
    }
    show(){
        image(images.plankBackgroundImage,this.x, this.y,this.w+1,textSize()+1)
        image(images.woodFrame,this.x,this.y+textSize()+1,this.w,this.h-textSize()-1)
        fill(255,245,144)
        text("SHOP $"+items.money.amount,this.x+this.w/2,textSize())
        let tSize=STYLE.textSize
        push()
        textSize(20)
        imageMode(CENTER)
        let index=0
        for(const item of this.items){
            let x=(index%4)
            let y=((index-x)/4)
            x=x+this.x+STYLE.margin + (x*(STYLE.treeSpotSize+STYLE.margin*5))
            y=y+this.y+tSize+STYLE.margin + (y*(STYLE.treeSpotSize+STYLE.margin))

            item.setShopButtons(x,y)
            
            item.showInShop(x,y)
            index++
        }
        pop()
    }
    isClicked(){
        for(const item of this.items){
            item.isClicked()
        }
    }
}