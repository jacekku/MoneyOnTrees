class Item{
    constructor(name,amount,image){
        this.name=name||"unnamed item"
        this.amount=amount
        this.image=image
    }
    addAmount(amount){
        this.amount+=amount
    }
    subtractAmount(amount){
        this.addAmount(-amount)
    }
    setAmount(amount){
        this.amount=amount
    }



    showInInventory(){
        fill(255)
        rect(0,0,STYLE.inventory.width,STYLE.itemHeightInInventory)
        rect(0,0,STYLE.itemHeightInInventory,STYLE.itemHeightInInventory)

        fill(0)
        text(this.name,STYLE.itemHeightInInventory+1,textSize())
        text(this.amount,STYLE.itemHeightInInventory+1,2*textSize())
        if(image)this.showImage()
    }
    showImage(){
        image(this.image,0,0,STYLE.itemHeightInInventory+1,STYLE.itemHeightInInventory+1)
    }

}