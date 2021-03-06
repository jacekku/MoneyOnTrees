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
        if (this.tree) {
            this.tree.show()
            if(debugMode){
                push()
                fill(0)
                textAlign(LEFT,TOP)
                textSize(15)
                text(this.tree.growthThreshold,this.x,this.y+textSize()*0)
                text(this.tree.growthCounter,this.x,this.y+textSize()*1)
                text(this.tree.growthStage,this.x,this.y+textSize()*2)
                text(this.tree.getTicksToFullyGrown(),this.x,this.y+textSize()*3)
                pop()
            }
        }

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
            let treeState=state.tree
            if (this.tree) this.tree.setState(treeState)
            else {
                this.tree = new Tree(this, treeState.type)
                this.tree.setState(treeState)
            }
        }
    }

    isClicked() {
        if (this.button.isClicked()) {
            this.onClick()
        }
    }

    onClick() {
        if (!this.tree && mouseObject.action.id == Actions.PLANT.id) {
            mouseObject.startAction(this,this.plantTree,actionTimes.plantSpeed.actualSpeed,mouseObject.action.plantType)
        } else if (this.tree.canHarvest() && mouseObject.action.id == Actions.HARVEST.id) {
            mouseObject.startAction(this,this.harvestTree,actionTimes.harvestSpeed.actualSpeed)
        }else if(this.tree.canChop() && mouseObject.action.id == Actions.CHOPDOWN.id){
            mouseObject.startAction(this,this.sellTree,actionTimes.chopSpeed.actualSpeed)
        }

    }
    plantTree(type) {
        this.tree = new Tree(this, type)
        items[type+"_saplings"].subtractAmount(1)
    }
    sellTree() {
        this.tree.chopItem.addAmount(actionTimes.treeYield.actualSpeed)
        this.tree = null
    }
    harvestTree(){
        this.tree.harvestItem.addAmount(actionTimes.fruitYield.actualSpeed)
        this.tree.harvested=true
    }
}