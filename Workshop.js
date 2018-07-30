class Workshop{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.items = {
            "Oak Planks": {
                resources: [
                    [items.oak_log, 1]

                ],
                products: [
                    [items.oak_plank,4]
                ],
                buttons:[]
            }
        }
        this.setButtons()
    }
    setButtons(){
        let spotSize = STYLE.itemInShopSize
        let startingX=this.x+(STYLE.margin)
        let startingY=this.y+(STYLE.margin)+textSize()
        this.items["Oak Planks"].buttons.push(new Button(startingX,startingY,spotSize,spotSize))
    }

    show(){
        drawView(this.x,this.y,this.w,this.h)
        fill(255,245,144)
        text("Workshop",this.x+this.w/2,textSize())
        let spotSize = STYLE.itemInShopSize
        let startingX=this.x+(STYLE.margin)
        let startingY=this.y+(STYLE.margin)+textSize()


        this.showItem(startingX,startingY,spotSize,this.items["Oak Planks"])

    }
    showItem(x,y,size,item){
        rect(x,y,size,size)
        image(item.products[0][0].image,x,y,size/2,size/2)
        
        fill(0)
        push()
        textAlign(LEFT,TOP)
        textSize(textSize()/2)
        text(item.products[0][0].amount+" +"+item.products[0][1],x+size/2,y,size/2,size/2)
        imageMode(CORNER)

        for(let res of item.resources){
            fill(0)
            image(res[0].image,x,y+size-size/4,size/4,size/4)
            text(res[0].amount+"/"+res[1],x,y+size-size/4-textSize())
            translate(size/4,0)
        }
        pop()
    }

    craftItem(item) {
        console.log("Craft ",item)
            let canCraft = true
            for (let res of item.resources) {
                if (res[0].amount < res[1]) {
                    canCraft = false
                    return false
                }
            }
            //handle item exchange
            for (let res of item.resources) {
                res[0].subtractAmount(res[1])
            }
            for (let prod of item.products) {
                prod[0].addAmount(prod[1])
            }
    }
    isClicked(){
        for(let item in this.items){
            for(let button of this.items[item].buttons){
                if(button.isClicked()){
                    this.craftItem(this.items[item])
                }
            }
        }
    }
}