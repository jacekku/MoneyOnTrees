class Shop{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.items=[
            new Item("Sapling",0,saplingImage,null,15,2)
            ,new Item("FILLER0",10,saplingImage,null,20,10)
            ,new Item("FILLER1",10,saplingImage,null,20,10)
            ,new Item("FILLER2",10,saplingImage,null,20,10)
            ,new Item("FILLER3",10,saplingImage,null,20,10)
            ,new Item("FILLER4",10,saplingImage,null,20,10)
            ,new Item("FILLER5",10,saplingImage,null,20,10)
            ,new Item("FILLER6",10,saplingImage,null,20,10)
            ,new Item("FILLER7",10,saplingImage,null,20,10)
            ,new Item("FILLER8",10,saplingImage,null,20,10)
            ,new Item("FILLER9",10,saplingImage,null,20,10)
            ,new Item("FILLER10",10,saplingImage,null,20,10)
            ]
    }
    show(){
        fill(255)
        rect(this.x,this.y,this.w,this.h)
        rect(this.x,this.y+textSize()+1,this.w,this.h-textSize()-1)
        fill(0)
        text("SHOP",this.x+this.w/2,textSize())
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