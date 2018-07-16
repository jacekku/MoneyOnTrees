let newTickEveryMS = 50
let oldTickTime = Date.now()
let running = true
tickCounter = 0
const STYLE = {
    textSize: 30,
    margin: 10,
    buttonSize: 50,
    buttonX: 10,
    buttonY: 620,
    treeSpotSize: undefined,
    orchard: {
        x: 10,
        y: 10,
        width: 600,
        height: 600,
        viewX: 10,
        viewY: 10
    },
    inventory: {
        x: 620,
        y: 10,
        width: 0,
        height: 600,
        viewOffsetX: 0,
        viewOffsetY: 40
    },
    itemHeightInInventory: 50
}
let mouseObject
let orchard, inventory, button, money, saplings, shop, shopButton
let treeSheet, coinImage, saplingImage
let shopOpen

function preload() {
    treeSheet = loadImage('assets/TreeSheet.png')
    saplingImage = loadImage('assets/TreeIcon.png')
    coinImage = loadImage('assets/coin.png')
    Actions = {
        NOTHING: {
            id: 0,
            image: null
        },
        SELL: {
            id: 1,
            image: coinImage
        },
        PLANT: {
            id: 2,
            image: saplingImage
        }
    }
}
var Actions


function setup() {
    createCanvas(900, 700)
    mouseObject = new Mouse()
    money = new Item("Money", 0, coinImage, Actions.SELL)
    saplings = new Item("Saplings", 20, saplingImage, Actions.PLANT)
    textAlign(CENTER, CENTER)
    textSize(STYLE.textSize)
    noCursor()
    STYLE.buttonSize = height - (STYLE.orchard.height + 3 * STYLE.margin)
    STYLE.treeSpotSize = (STYLE.orchard.height / 3) - (3 * STYLE.margin)
    STYLE.orchard.viewY += STYLE.textSize + STYLE.margin
    STYLE.inventory.width = width - 620 - 10
    orchard = new Orchard()
    inventory = new Inventory()
    shop = new Shop(10, 10, width - 20, height - 30 - STYLE.buttonSize)
    inventory.items.push(money)
    inventory.items.push(saplings)



    button = new Button(STYLE.buttonX, STYLE.buttonY)
    button.setImage(coinImage)
    button.setOnClick(function () {
        mouseObject.setAction(Actions.SELL)
    })
    shopButton = new Button(STYLE.buttonX + STYLE.margin + STYLE.buttonSize, STYLE.buttonY)
    shopButton.setImage(saplingImage)
    shopButton.setOnClick(function () {
        shopOpen = !shopOpen
    })

}

function draw() {
    background(128)
    if (shopOpen) {
        shop.show()
    } else {
        orchard.show()
        inventory.show()
    }
    button.show()
    shopButton.show()
    if (running && oldTickTime < Date.now()) {
        orchard.tick()
        inventory.tick()
        oldTickTime = Date.now() + newTickEveryMS;

    }

    if (mouseObject.action && mouseObject.action.image) {
        image(mouseObject.action.image, mouseX, mouseY, 40, 40)
        rect(mouseX, mouseY, 2, 10)
        rect(mouseX, mouseY, 10, 2)
    } else {
        rect(mouseX, mouseY, 10, 20)
    }
}

function mouseClicked() {
    orchard.isClicked()
    inventory.isClicked()
    button.isClicked()
    shopButton.isClicked()
}

document.onvisibilitychange = function () {

}