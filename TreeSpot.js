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
            mouseObject.startAction(this,this.plantTree,1000,mouseObject.action.plantType)//HARDCODE
        } else if (this.tree.canHarvest() && mouseObject.action.id == Actions.HARVEST.id) {
            mouseObject.startAction(this,this.harvestTree,2500)//HARDCODE
        }else if(this.tree.canChop() && mouseObject.action.id == Actions.CHOPDOWN.id){
            mouseObject.startAction(this,this.sellTree,5000)//HARDCODE
        }

    }
    plantTree(type) {
        this.tree = new Tree(this, type)
        items[type+"_saplings"].subtractAmount(1)
    }
    sellTree() {
        this.tree.chopItem.addAmount(1)
        this.tree = null
    }
    harvestTree(){
        this.tree.harvestItem.addAmount(1)
        this.tree.harvested=true
    }
}