class Inventory {
    constructor(...items) {
        this.button = new Button(620, 10, width - 620 - 10, 600)
        this.items = [...items]
    }
    show() {
        let bound = STYLE.inventory
        image(images.plankBackgroundImage,bound.x, bound.y,bound.width,textSize())
        image(images.woodFrame,bound.x, bound.y + textSize(), bound.width, bound.height - textSize())
        fill(255,245,144)
        text("INVENTORY", bound.x + bound.width / 2, textSize())


        push()
        translate(620, bound.y + textSize())
        textSize(20)
        textAlign(LEFT)
        for (const item of this.items) {
            if (item.name=="Money"||item.amount > 0) {
                item.showInInventory()
                translate(0, STYLE.itemHeightInInventory)
            }
        }
        pop()
    }
    tick() {
        this.updateItems()
    }



    onClick() {
        this.updateItemsButtons()
        for (const item of this.items) {
            item.isClicked()
        }
    }
    isClicked() {
        if (this.button.isClicked()) this.onClick()
    }
    updateItemsButtons() {
        let bound = STYLE.inventory
        let itemHeight = STYLE.itemHeightInInventory
        let index = 0
        for (const item of this.items) {
            if (item.name==="Money"||item.amount > 0) {
                item.setButton(new Button(bound.x, bound.y + textSize() + (index * itemHeight), bound.width, itemHeight))
                index++
            }
            else{
                item.setButton(null)
            }
        }
    }
    updateItems() {
        for (const item of this.items) {
            //    if (item.amount == 0) {
            //     this.items.splice(this.items.indexOf(item), 1)
            //    }
        }

    }
    getItemByName(name){
        for (const item of this.items) {
            if(item.name==name)return item
        }
    }

}