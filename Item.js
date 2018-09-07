class Item {
    constructor(name, amount, image, action, buyPrice, sellPrice,plantType) {
        this.name = name || "unnamed item"
        this.amount = amount
        this.image = image
        this.sellPrice = sellPrice || 0
        this.buyPrice = buyPrice || 0
        this.action = {}
        this.plantType=plantType
        this.button
        this.buyButton
        this.sellButton
        this.sellAllButton
        this.setupAction(action)
    }
    setupAction(action){
        if(action && action.id==Actions.PLANT.id){
            Object.assign(this.action,action)
            this.action.image=this.image
            this.action.plantType=this.plantType
        }
    }


    addAmount(amount) {
        this.amount += amount
        return true
    }
    subtractAmount(amount) {
        if (this.amount-amount == 0) {
            if(this.action) mouseObject.setAction(Actions.NOTHING)
            return this.addAmount(-amount)
        }
        if (this.amount-amount < 0) return false

        return this.addAmount(-amount)
    }
    setAmount(amount) {
        this.amount = amount
    }
    setButton(button, buttonID = "main") {
        switch (buttonID) {
            case "main":
                this.button = button
                break;
            case "sell":
                this.sellButton = button
                break
            case "sellAll":
                this.sellAllButton = button
                break
            case "buy":
                this.buyButton = button
                break
            case "buyAll":
                this.buyAllButton = button
                break
            default:
                break;
        }
    }
    buyItem(amount=1){
        if(this.buyPrice==0)return false
        let item=inventory.getItemByName(this.name)||console.error("not in inventory FIXIT !!!")
        if(!item)return false
        // TODO change this so the item object doesnt need to know about other items
        if (items.money.subtractAmount(this.buyPrice * amount)) {
            item.addAmount(amount)
            return true
        }
        return false
    }
    buyItemAll(){
        console.log("BUY ALL")
        while(this.buyItem()){}
    }
    sellItem(amount=1){
        let item=inventory.getItemByName(this.name)||console.error("not in inventory FIXIT !!!")
        if(!item)return
        if(item.subtractAmount(amount))
            items.money.addAmount(this.sellPrice*amount)
    }



    onClick(buttonID=0) {
        if(buttonID==0){
            if(views.orchard)mouseObject.setAction(this.action)
        }
        else if(buttonID==1){
            this.buyItem()
        }
        else if(buttonID==2){
            this.sellItem()
        }
        else if(buttonID==3){
            this.sellItem(this.amount)
        }
        else if(buttonID==4){
            this.buyItemAll()
        }
    }
    isClicked() {
        if (this.button && this.button.isClicked()) {
            this.onClick(0)
            return true
        }
       
        if (this.buyButton && this.buyButton.isClicked()) {
            this.onClick(1)
            return true
        }
        if (this.sellButton && this.sellButton.isClicked()) {
            this.onClick(2)
            return true
        }
        if (this.sellAllButton && this.sellAllButton.isClicked()) {
            this.onClick(3)
            return true
        }
        if(this.buyAllButton && this.buyAllButton.isClicked()){
            this.onClick(4)
            return true
        }

        
         else return false
    }

    showInInventory() {
        fill(255)
        rect(0, 0, STYLE.inventory.width, STYLE.itemHeightInInventory)
        rect(0, 0, STYLE.itemHeightInInventory, STYLE.itemHeightInInventory)
        fill(0)
        text(this.name, STYLE.itemHeightInInventory + 1, textSize())
        text(this.amount, STYLE.itemHeightInInventory + 1, 2 * textSize())
        if (this.image) this.showImage()
    }
    showImage(x = 0, y = 0, w = STYLE.itemHeightInInventory, h = w) {
        image(this.image, x, y, w + 1, h + 1)
    }
    showInShop(x, y) {
        fill(255)
        let spotSize = STYLE.itemInShopSize
        let itemSize = STYLE.itemHeightInInventory
        rect(x, y, spotSize, itemSize+textSize())
        imageMode(CENTER)
        image(this.image, x + spotSize / 2, y + itemSize / 2, itemSize, itemSize)

        let pos=this.buyButton.show(color(0,255,0))
        pos.x=pos.x+spotSize/4
        pos.y=pos.y+textSize()
        fill(0)
        text("BUY",pos.x,pos.y)
        text("$"+this.buyPrice,pos.x,pos.y+textSize())


        pos=this.sellButton.show(color(255,0,0))
        pos.x=pos.x+spotSize/4
        pos.y=pos.y+textSize()
        fill(0)
        text("SELL",pos.x,pos.y)
        text("$"+this.sellPrice,pos.x,pos.y+textSize())
        let getItem=inventory.getItemByName(this.name)||{amount:0}
        text(getItem.amount,pos.x,pos.y+textSize()*2)

        pos=this.sellAllButton.show(color(255,0,0))
        fill(0)
        push()
        textAlign(LEFT,TOP)
        text("SELL ALL",pos.x,pos.y)
        pop()


        pos=this.buyAllButton.show(color(255,0,0))
        fill(0)
        push()
        textAlign(LEFT,TOP)
        text("BUY ALL",pos.x,pos.y)
        pop()
        
        text(this.name, x + spotSize / 2, y + itemSize + textSize() / 2)

    }
    setShopButtons(x, y) {
        let itemSize = STYLE.itemHeightInInventory + textSize()
        let spotSize = STYLE.itemInShopSize
        let middleX = (spotSize / 2)

        this.setButton(new Button(x, y + itemSize, spotSize / 2, spotSize - itemSize-textSize()), "buy")
        if(this.buyPrice==0)this.buyButton.setImage(images.notBuyButtonImage)
        else this.buyButton.setImage(images.buyButtonImage)
        this.setButton(new Button(x + middleX, y + itemSize, spotSize / 2, spotSize - itemSize-textSize()), "sell")
        this.sellButton.setImage(images.sellButtonImage)
        this.setButton(new Button(x + middleX, y + itemSize +spotSize - itemSize-textSize(), spotSize / 2, textSize()), "sellAll")
        this.sellAllButton.setImage(images.sellButtonImage)
        this.setButton(new Button(x, y + itemSize +spotSize - itemSize-textSize(), spotSize / 2, textSize()), "buyAll")
        this.buyAllButton.setImage(images.buyButtonImage)
    }
}