class Orchard {
    constructor() {
        this.treeSpots = []
        this.fillTreeSpots()
    }
    show() {
        image(images.plankBackgroundImage,STYLE.orchard.x, STYLE.orchard.y,STYLE.orchard.width,textSize())
        fill("#4CFF00")
        // image(woodFrame,STYLE.orchard.x, STYLE.orchard.y+textSize(), STYLE.orchard.width, STYLE.orchard.height - textSize())
        rect(STYLE.orchard.x, STYLE.orchard.y+textSize(), STYLE.orchard.width, STYLE.orchard.height - textSize())
        fill(255,245,144)
        text("ORCHARD", STYLE.orchard.y+STYLE.orchard.width/2, textSize())
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
        let startX=STYLE.orchard.x+STYLE.margin*1.5
        let startY=STYLE.orchard.y+textSize()+STYLE.margin
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.treeSpots.push(
                new TreeSpot(
                    startX+(j*(STYLE.treeSpotSize+STYLE.margin*2)),
                    startY+(i*(STYLE.treeSpotSize+STYLE.margin))
                ))
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
    getTreeSpotStates(){
        let output=[]
        for(const spot of this.treeSpots){
            output.push(spot.getState())
        }
        return output
    }
    setTreeSpotStates(state){
        for(let i=0;i<this.treeSpots.length;i++){
            this.treeSpots[i].setState(state[i])
        }
    }
}