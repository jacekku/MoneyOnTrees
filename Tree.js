class Tree {
    constructor(spot, type, growthStage = 0, growthCounter = 0, growthThreshold = 200) {//HARDCODE
        this.spot = spot
        this.type = type
        this.growthStage = growthStage
        this.growthCounter = growthCounter
        this.growthThreshold = debugMode?10:growthThreshold
        this.maxGrowthStage = 14
        this.chopItem=treeItems[this.type].chopItem
        this.harvestItem=treeItems[this.type].harvestItem
        this.harvested = false
    }
    show() {
        let stageSize = 200//HARDCODE
        image(images[this.type + "_sheet"], this.spot.x, this.spot.y, STYLE.treeSpotSize, STYLE.treeSpotSize, this.growthStage * stageSize, 0, stageSize, stageSize)
    }
    tick() {
        this.growthCounter++
            if (this.growthCounter > this.growthThreshold) {
                this.growthStage += this.growthStage < this.maxGrowthStage ? 1 : 0
                this.growthCounter = 0
            }
    }
    getState() {
        return {
            type: this.type,
            growthStage: this.growthStage,
            growthCounter: this.growthCounter,
            growthThreshold: this.growthThreshold,
            maxGrowthStage: this.maxGrowthStage
        }
    }
    setState(state) {
        this.type = state.type
        this.growthStage = state.growthStage
        this.growthCounter = state.growthCounter
        this.growthThreshold = state.growthThreshold
        this.maxGrowthStage = state.maxGrowthStage
    }

    canChop() {
        return this.maxGrowthStage === this.growthStage && (this.harvestItem?this.harvested:true)
    }
    canHarvest() {
        return this.maxGrowthStage === this.growthStage && this.harvestItem && !this.harvested 
    }
}