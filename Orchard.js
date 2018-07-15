class Orchard {
    constructor() {
        this.treeSpots = []
        this.fillTreeSpots()
    }
    show() {
        fill(255)
        rect(STYLE.orchard.x, STYLE.orchard.y, STYLE.orchard.width, STYLE.orchard.height)
        fill(100, 255, 100)
        rect(STYLE.orchard.viewX, STYLE.orchard.viewY, STYLE.orchard.width, STYLE.orchard.height - STYLE.orchard.viewY + STYLE.margin)
        fill(0)
        text("ORCHARD", 10 + (600 / 2), textSize())
        for (const treeSpot of this.treeSpots) {
            treeSpot.show()
        }
    }
    tick(){
        for (const treeSpot of this.treeSpots) {
            treeSpot.tick()
        }
    }
    fillTreeSpots() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.treeSpots.push(new TreeSpot((2 * STYLE.margin) + (i * STYLE.treeSpotSize )+(i*STYLE.margin), STYLE.orchard.viewY+(STYLE.margin) + (j * STYLE.treeSpotSize)+(j*STYLE.margin)))
            }
        }
    }
    onClick(){
        console.log("Clicked")
    }
    isClicked(){
        for (const treeSpot of this.treeSpots) {
            treeSpot.isClicked()
        }
    }


}