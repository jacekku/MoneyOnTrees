class Item {
    constructor(name, amount, image, action, buyPrice, sellPrice) {
        this.name = name || "unnamed item"
        this.amount = amount
        this.image = image
        this.button
        this.buyButton
        this.sellButton
        this.sellPrice = sellPrice || 0
        this.buyPrice = buyPrice || 0
        this.id
        this.action = action
    }
    addAmount(amount) {
        this.amount += amount
        return true
    }
    subtractAmount(amount) {
        if (this.amount-amount == 0) {
            if(this.action && mouseObject.action.id == this.action.id) mouseObject.setAction(Actions.NOTHING)
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
            case "buy":
                this.buyButton = button
                break
            default:
                break;
        }
    }
    buyItem(amount=1){
        if(this.buyPrice==0)return
        let item=inventory.getItemByName(this.name)||console.log("not in inventory FIXIT !!!")
        if(!item)return
        // TODO change this so the item object doesnt need to know about other items
        if(items.money.subtractAmount(this.buyPrice*amount))
        item.addAmount(amount)
    }
    sellItem(amount=1){
        let item=inventory.getItemByName(this.name)||console.log("not in inventory FIXIT !!!")
        if(!item)return
        if(item.subtractAmount(amount))
            items.money.addAmount(this.sellPrice*amount)
    }



    onClick(buttonID=0) {
        //button
        if(buttonID==0){mouseObject.setAction(this.action)}
        //buy
        else if(buttonID==1){
            this.buyItem()
        }
        //sell
        else if(buttonID==2){
            this.sellItem()
        }
    }
    isClicked() {
        if (this.button && this.button.isClicked()) {
            this.onClick(0)
            return true
        }

        if (this.buyButton && this.buyButton.isClicked()) {
            this.onClick(1)

        }
        if (this.sellButton && this.sellButton.isClicked()) {
            this.onClick(2)
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
        let spotSize = STYLE.treeSpotSize
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

        text(this.name, x + spotSize / 2, y + itemSize + textSize() / 2)

    }
    setShopButtons(x, y) {
        let itemSize = STYLE.itemHeightInInventory + textSize()
        let spotSize = STYLE.treeSpotSize
        let middleX = (spotSize / 2)

        this.setButton(new Button(x, y + itemSize, spotSize / 2, spotSize - itemSize), "buy")
        if(this.buyPrice==0)this.buyButton.setImage(images.notBuyButtonImage)
        else this.buyButton.setImage(images.buyButtonImage)
        this.setButton(new Button(x + middleX, y + itemSize, spotSize / 2, spotSize - itemSize), "sell")
        this.sellButton.setImage(images.sellButtonImage)

    }
}