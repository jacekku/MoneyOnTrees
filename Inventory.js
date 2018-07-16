class Inventory {
    constructor() {
        this.button = new Button(620, 10, width - 620 - 10, 600)
        this.items = []
    }
    show() {
        fill(255)
        let bound = STYLE.inventory
        rect(bound.x, bound.y, bound.width, bound.height)
        rect(620, 50, width - 620 - 10, 600 - 40)
        fill(0)
        text("INVENTORY", 620 + ((width - 620 - 10) / 2), textSize())

        push()
        translate(620, 50)
        textSize(20)
        textAlign(LEFT)
        for (const item of this.items) {
            item.showInInventory()
            translate(0, STYLE.itemHeightInInventory)
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
            item.setButton(new Button(bound.x, 40 + bound.y + (index * itemHeight), bound.width, itemHeight))
            index++
        }
    }
    updateItems() {
        for (const item of this.items) {
            if (item.amount == 0) {
                this.items.splice(this.items.indexOf(item), 1)
            }
        }

    }

}