let newTickEveryMS = 50
let oldTickTime = Date.now()
let running = true
tickCounter = 0

let mouseObject
let orchard, inventory,  money, oak_saplings, shop
let debugMode=false

let actionTimes

let Actions
function preload() {
    loadAllImages()
    actionTimes=setupActionTimes()
    Actions=setupActions()
    items=setupItems()
}



function setup() {
    createCanvas(900, 700)
    mouseObject = new Mouse()
    textAlign(CENTER, CENTER)
    textSize(STYLE.textSize)
    noCursor()
    noStroke()
   
    STYLE.buttonSize = height - (STYLE.orchard.height + 3 * STYLE.margin)
    STYLE.orchard.viewY += STYLE.textSize + STYLE.margin

    STYLE.itemInShopSize = (STYLE.orchard.height-textSize()-(STYLE.margin*4))/3
    STYLE.treeSpotSize = 100
    
    STYLE.inventory.width = width - 620 - 10
    if(!orchard)orchard = new Orchard()
    shop = new Shop(10, 10, width - 20, height - 30 - STYLE.buttonSize)
    workshop = new Workshop(10, 10, width - 20, height - 30 - STYLE.buttonSize)
    upgrades = new Upgrades(10, 10, width - 20, height - 30 - STYLE.buttonSize)
    settings=new Settings()

    setupButtons();
    loadGame(mainSave)
}

function draw() {
    background(128)
    if (views.shop) {
        shop.show()
    }
    else if (views.workshop) {
        workshop.show()
    }
    else if (views.upgrades) {
        upgrades.show()
    }
    else {
        orchard.show()
        if (views.settings) {
            settings.show()
        } else {
            inventory.show()
        }

    }
    




    for(const button in buttons){
        buttons[button].show()
    }
    if (running && oldTickTime < Date.now()) {
        tick()
        oldTickTime = Date.now() + newTickEveryMS;
    }
    
    mouseObject.show()
}
function keyPressed(){
    if(keyCode==109){
        debugMode=!debugMode
    }
}
function mouseClicked() {
    if (views.shop) {
        shop.isClicked()
    }
    else if (views.workshop) {
        workshop.isClicked()
    }
    else if (views.upgrades) {
        upgrades.isClicked()
    }
     else {
        orchard.isClicked()
        if (views.settings) {
           settings.isClicked()
        } else {
            inventory.isClicked()
        }
    }
    for(const button in buttons){
        buttons[button].isClicked()
    }
}
function tick(){
    orchard.tick()
    mouseObject.tick()
    tickCounter++
}



