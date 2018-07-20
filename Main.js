let newTickEveryMS = 50
let oldTickTime = Date.now()
let running = true
tickCounter = 0

let mouseObject
let orchard, inventory,  money, oak_saplings, shop

let shopOpen=false
let Actions
function preload() {
    loadAllImages()
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
    STYLE.treeSpotSize = (STYLE.orchard.height-textSize()-(STYLE.margin*4))/3
    STYLE.inventory.width = width - 620 - 10
    if(!orchard)orchard = new Orchard()
    inventory = new Inventory()
    shop = new Shop(10, 10, width - 20, height - 30 - STYLE.buttonSize)
    inventory.items.push(items.money)
    inventory.items.push(items.oak_saplings)
    inventory.items.push(items.oak_log)
    inventory.items.push(items.oak_plank)



    buttons.harvestButton = new Button(STYLE.buttonX, STYLE.buttonY)
    buttons.harvestButton.setImage(images.harvestImage)
    buttons.harvestButton.setOnClick(function () {
        mouseObject.setAction(Actions.HARVEST)
    })
    buttons.shopButton = new Button(STYLE.buttonX + STYLE.margin + STYLE.buttonSize, STYLE.buttonY)
    buttons.shopButton.setImage(images.shopImage)
    buttons.shopButton.setOnClick(function () {
        shopOpen = !shopOpen
    })
    loadGame()
}

function draw() {
    background(128)
    if (shopOpen) {
        shop.show()
    } else {
        orchard.show()
        inventory.show()
    }
    for(const button in buttons){
        buttons[button].show()
    }
    if (running && oldTickTime < Date.now()) {
        tick()
        oldTickTime = Date.now() + newTickEveryMS;
    }
    fill(0)
    if (mouseObject.action && mouseObject.action.image) {
        image(mouseObject.action.image, mouseX, mouseY, 40, 40)
    }
    rect(mouseX, mouseY, 2, 10)
    rect(mouseX, mouseY, 10, 2)
}

function mouseClicked() {
    if (shopOpen) {
        shop.isClicked()
    } else {
        orchard.isClicked()
        inventory.isClicked()
    }
    for(const button in buttons){
        buttons[button].isClicked()
    }
}
function tick(){
    orchard.tick()
    inventory.tick()
    tickCounter++
}



