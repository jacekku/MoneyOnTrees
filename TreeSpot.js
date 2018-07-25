class TreeSpot {
    constructor(x, y, price) {
        this.x = x
        this.y = y
        this.price = price
        this.tree
        this.button = new Button(this.x, this.y, STYLE.treeSpotSize, STYLE.treeSpotSize)
    }
    show() {
        fill(255)
        rect( this.x, this.y, STYLE.treeSpotSize, STYLE.treeSpotSize)
        //image(images.groundImage, this.x, this.y, STYLE.treeSpotSize, STYLE.treeSpotSize)
        if (this.tree) this.tree.show()

    }
    tick() {
        if (this.tree) this.tree.tick()
    }
    getState() {
        if (this.tree) return {
            price: this.price,
            tree: this.tree.getState()
        }
        else return {
            price: this.price
        }
    }
    setState(state) {
        this.price = state.price
        if (state.tree) {
            let tree=state.tree
            if (this.tree) this.tree.setState(tree)
            else this.tree = new Tree(this, tree.type, tree.growthStage, tree.growthCounter, tree.growthThreshhold)
        }
    }

    isClicked() {
        if (this.button.isClicked()) {
            this.onClick()
        }
    }

    onClick() {
        if (!this.tree && mouseObject.action.id == Actions.PLANT.id) {
            this.plantTree()
        } else if (this.tree.canHarvest() && mouseObject.action.id == Actions.HARVEST.id) {
            this.sellTree()
        }

    }
    plantTree() {
        this.tree = new Tree(this, "oak")
        items.oak_saplings.subtractAmount(1)
    }
    sellTree() {
        items.oak_log.addAmount(1)
        this.tree = null
    }
}