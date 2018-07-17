class Shop{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.items=[new Item("Sapling",10,saplingImage,null,20,10)]
    }
    show(){
        fill(255)
        rect(this.x,this.y,this.w,this.h)
        rect(this.x,this.y+textSize()+1,this.w,this.h-textSize()-1)
        fill(0)
        text("SHOP",this.x+this.w/2,textSize())

        push()
        
        translate(this.x+STYLE.margin,this.y+STYLE.margin+textSize())
        textSize(20)
        for(const item of this.items){
            item.showInShop(item.buyPrice,item.sellPrice,item.amount)
            item.setShopButtons(x,y)
        }
        pop()
    }
}