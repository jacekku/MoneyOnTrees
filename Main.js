let newTickEveryMS = 50
let oldTickTime = Date.now()
let running = true
tickCounter = 0

let mouseObject
let orchard, inventory,  money, oak_saplings, shop
let views={
    orchard:true,
    workshop:false,
    shop:false,
    settings:false
}

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
    workshop = new Workshop(10, 10, width - 20, height - 30 - STYLE.buttonSize)
    settings=new Settings()
    inventory.items.push(items.money)
    inventory.items.push(items.oak_saplings)
    inventory.items.push(items.oak_log)
    inventory.items.push(items.oak_plank)



    buttons.harvestButton = new Button(STYLE.buttonX, STYLE.buttonY)
    buttons.harvestButton.setImage(images.harvestImage)
    buttons.harvestButton.setOnClick(function () {
        mouseObject.setAction(Actions.HARVEST)
        openView("orchard")
    })
    buttons.shopButton = new Button(STYLE.buttonX + STYLE.margin + STYLE.buttonSize, STYLE.buttonY)
    buttons.shopButton.setImage(images.shopImage)
    buttons.shopButton.setOnClick(function () {
        openView("shop")
    })
    buttons.workshopButton = new Button(STYLE.buttonX + STYLE.margin*2 + STYLE.buttonSize*2, STYLE.buttonY)
    buttons.workshopButton.setImage(images.workshopImage)
    buttons.workshopButton.setOnClick(function () {
        openView("workshop")
        
    })
    buttons.settingsButton = new Button(STYLE.buttonX + STYLE.margin*10 + STYLE.buttonSize*10, STYLE.buttonY)
    buttons.settingsButton.setImage(images.settings)
    buttons.settingsButton.setOnClick(function () {
        openView("settings")
    })


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

function mouseClicked() {
    if (views.shop) {
        shop.isClicked()
    }
    else if (views.workshop) {
        workshop.isClicked()
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
    inventory.tick()
    mouseObject.tick()
    tickCounter++
}



