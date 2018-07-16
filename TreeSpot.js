class TreeSpot {
    constructor(x, y, price) {
        this.x = x
        this.y = y
        this.price = price
        this.tree
        this.button = new Button(this.x, this.y, STYLE.treeSpotSize, STYLE.treeSpotSize)
    }
    show() {
        fill(0, 255, 255)
        rect(this.x, this.y, STYLE.treeSpotSize, STYLE.treeSpotSize)
        if (this.tree) this.tree.show()

    }
    tick() {
        if (this.tree) this.tree.tick()
    }
    getTree() {
        return this.tree
    }

    isClicked() {
        if (this.button.isClicked()) {
            this.onClick()
        }
    }

    onClick() {
        if (!this.tree && mouseObject.action == Actions.PLANT) {
            this.plantTree()
        } else if (this.tree.growthStage == 5 && mouseObject.action == Actions.SELL) {
            this.sellTree()
        }

    }
    plantTree() {
        this.tree = new Tree(this, "oak")
        saplings.subtractAmount(1)
    }
    sellTree() {
        money.addAmount(10)
        this.tree = null
    }
}