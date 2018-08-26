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
            },
            "Pine Planks": {
                resources: [
                    [items.pine_log, 1]

                ],
                products: [
                    [items.pine_plank,4]
                ],
                buttons:[]
            },
            "Cherry Planks": {
                resources: [
                    [items.cherry_log, 1]

                ],
                products: [
                    [items.cherry_plank,4]
                ],
                buttons:[]
            },
        }
        this.itemNames=[]
        this.catalogItemNames()
        this.setButtons()
    }
    setButtons(){
        let itemIndex=0
        let spotSize = STYLE.itemInShopSize
        let y = this.y+(STYLE.margin)+textSize()
        let x = this.x+(STYLE.margin)
        for(let i=1;i<=12;i++){
                if(itemIndex!=-1){
                    this.items[this.itemNames[itemIndex]].buttons.push(new Button(x,y,spotSize,spotSize))
                }

                
                x+=spotSize+STYLE.margin
                if(i%4==0){
                    x=this.x+(STYLE.margin)
                    y+=spotSize+STYLE.margin
                }
                if(itemIndex!=-1 &&itemIndex<this.itemNames.length-1){
                    itemIndex++
                }else{itemIndex=-1}
            }


        // this.items["Oak Planks"].buttons.push(new Button(startingX,startingY,spotSize,spotSize))
        // this.items["Pine Planks"].buttons.push(new Button(startingX + spotSize+STYLE.margin,startingY,spotSize,spotSize))
    }


    

    show(){
        drawView(this.x,this.y,this.w,this.h,"WORKSHOP")
        let spotSize = STYLE.itemInShopSize
        let startingX=this.x+(STYLE.margin)
        let startingY=this.y+(STYLE.margin)+textSize()

        this.showAllItems()
        // this.showItem(startingX,startingY,spotSize,this.items["Oak Planks"])
        // this.showItem(startingX + spotSize+STYLE.margin,startingY,spotSize,this.items["Pine Planks"])
    }
    showItem(x,y,size,item){
        if(typeof item == "string"){
            item=this.items[item]
        }
        fill(255,245,144)
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

    showAllItems() {
        let itemIndex=0
        let spotSize = STYLE.itemInShopSize
        let y = this.y+(STYLE.margin)+textSize()
        let x = this.x+(STYLE.margin)
        for(let i=1;i<=12;i++){
                if(itemIndex!=-1){this.showItem(x, y, spotSize, this.itemNames[itemIndex])}


                x+=spotSize+STYLE.margin
                if(i%4==0){
                    x=this.x+(STYLE.margin)
                    y+=spotSize+STYLE.margin
                }
                if(itemIndex!=-1 &&itemIndex<this.itemNames.length-1){
                    itemIndex++
                }else{itemIndex=-1}
            }
        }
    catalogItemNames(){
        for (const item in this.items){
            this.itemNames.push(item)
        }
    }

    craftItem(item) {
            for (let res of item.resources) {
                if (res[0].amount < res[1]) {
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