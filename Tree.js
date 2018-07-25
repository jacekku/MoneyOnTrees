class Tree {
    constructor(spot, type, growthStage = 0, growthCounter = 0, growthThreshold = 50) {
        this.spot = spot
        this.type = type
        this.growthStage = growthStage
        this.growthCounter = growthCounter
        this.growthThreshold = growthThreshold
        this.maxGrowthStage=14
    }
    show() {
        let stageSize=200
        image(images[this.type+"_sheet"], this.spot.x, this.spot.y, STYLE.treeSpotSize, STYLE.treeSpotSize, this.growthStage * stageSize, 0, stageSize, stageSize)
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
            maxGrowthStage:this.maxGrowthStage
        }
    }
    setState(state) {
        this.type = state.type
        this.growthStage = state.growthStage
        this.growthCounter = state.growthCounter
        this.growthThreshold = state.growthThreshold
        this.maxGrowthStage = state.maxGrowthStage
    }
    canHarvest(){
        return this.maxGrowthStage===this.growthStage
    }
}