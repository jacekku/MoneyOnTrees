class Item {
    constructor(name, amount, image,action, buyPrice,sellPrice) {
        this.name = name || "unnamed item"
        this.amount = amount
        this.image = image
        this.button
        this.buyButton
        this.sellButton
        this.sellPrice=sellPrice||0
        this.buyPrice=buyPrice||0
        this.id
        this.action = action
    }
    addAmount(amount) {
        this.amount += amount
    }
    subtractAmount(amount) {
        if(this.amount==1){
            this.addAmount(-amount)
            if(mouseObject.action==this.action)mouseObject.setAction(Actions.NOTHING)
        }
        if(this.amount<=0)return false
        
        this.addAmount(-amount)
    }
    setAmount(amount) {
        this.amount = amount
    }
    setButton(button) {
        this.button = button
    }
    onClick() {
        mouseObject.setAction(this.action)
    }
    isClicked() {
        if (this.button && this.button.isClicked()) {
            this.onClick()
            return true
        } else return false
    }

    showInInventory() {
        fill(255)
        rect(0, 0, STYLE.inventory.width, STYLE.itemHeightInInventory)
        rect(0, 0, STYLE.itemHeightInInventory, STYLE.itemHeightInInventory)
        fill(0)
        text(this.name, STYLE.itemHeightInInventory + 1, textSize())
        text(this.amount, STYLE.itemHeightInInventory + 1, 2 * textSize())
        if (image) this.showImage()
    }
    showImage(x=0,y=0,w=STYLE.itemHeightInInventory,h=w) {
        image(this.image, x, y, w + 1, h + 1)
    }
    showInShop(buyPrice,sellPrice,available=0,isAvailable=true){
        let itemSize=STYLE.itemHeightInInventory
        let spotSize=STYLE.treeSpotSize
        let middleX=(spotSize/2)
        fill(255)
        rect(0,0,spotSize,spotSize)
        this.showImage(middleX-itemSize/2)
        line(0,itemSize,spotSize,itemSize)
        itemSize+=textSize()
        line(0,itemSize,spotSize,itemSize)
        fill(200*!isAvailable,255,200*!isAvailable)
        rect(0,itemSize,spotSize/2,spotSize-itemSize)
        fill(255,0,0)
        rect(spotSize/2,itemSize,spotSize/2,spotSize-itemSize)
        fill(0)
        text("$"+buyPrice,middleX-middleX/2,itemSize+textSize())
        text(""+available,middleX-middleX/2,itemSize+textSize()*2)
        text("$"+sellPrice,middleX+middleX/2,itemSize+textSize())
        text(this.name,middleX,STYLE.itemHeightInInventory+textSize()/2)
        
    }


}