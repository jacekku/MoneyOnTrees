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
            let card=new Card(x,y,spotSize,spotSize)
                if(itemIndex!=-1){
                    let subSpace=card.subSpaces.topRight
                    let craftOne=new Button(subSpace.x,subSpace.y,subSpace.width,subSpace.height/2)
                    craftOne.setName("craftOne")
                    let craftAll=new Button(subSpace.x,subSpace.y+subSpace.height/2,subSpace.width,subSpace.height/2)
                    craftAll.setName("craftAll")

                    this.items[this.itemNames[itemIndex]].buttons.push(craftOne)
                    this.items[this.itemNames[itemIndex]].buttons.push(craftAll)
                }

                
                x+=spotSize+STYLE.margin*5
                if(i%4==0){
                    x=this.x+(STYLE.margin)
                    y+=spotSize+STYLE.margin
                }
                if(itemIndex!=-1 &&itemIndex<this.itemNames.length-1){
                    itemIndex++
                }else{itemIndex=-1}
            }
    }


    

    show(){
        drawView(this.x,this.y,this.w,this.h,"WORKSHOP")
        this.showAllItems()
    }
    showItem(x,y,size,item){
        if(typeof item == "string"){
            item=this.items[item]
        }
        let card=new Card(x,y,size,size)
        let subSpaces=card.subSpaces
        fill(255,245,144)
        rect(x,y,size,size)
        let topLeft=subSpaces.topLeft
        image(item.products[0][0].image,topLeft.x,topLeft.y,topLeft.width,topLeft.height)
        fill(0)
        push()
        textAlign(CENTER,TOP)
        textSize(textSize()/2)
        
        let topRight=subSpaces.topRight
        stroke(0)
        strokeWeight(0.5)
        fill(0)
        for(let button of item.buttons){button.show([255,245,144])}
        text("craft "+item.products[0][1],  topRight.x,topRight.y+topRight.height/8,topRight.width,topRight.height)
        text("craft all",                   topRight.x,topRight.y+topRight.height/2+textSize(),topRight.width,topRight.height)
        imageMode(CORNER)
        textAlign(LEFT)
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

                x+=spotSize+STYLE.margin*5
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
            return true
    }
    craftItemMax(item){
        while(this.craftItem(item)){}
    }
    isClicked(){
        for(let item in this.items){
            for(let button of this.items[item].buttons){
                if(button.isClicked()&& button.name=="craftOne"){
                    this.craftItem(this.items[item])
                }
                if(button.isClicked()&& button.name=="craftAll"){
                    this.craftItemMax(this.items[item])
                }
            }
        }
    }
}