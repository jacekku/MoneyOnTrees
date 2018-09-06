let newTickEveryMS = 50
let oldTickTime = Date.now()
let running = true
tickCounter = 0

let mouseObject
let orchard, inventory, money, oak_saplings, shop
let debugMode = false

soundEnabled = true
gameWonAt = 0
continuePlay = false


let actionTimes

let Actions

function preload() {
    comeBackSound = loadSound("assets/sounds/comeBack.wav")
    loadAllImages()
    actionTimes = setupActionTimes()
    Actions = setupActions()
    items = setupItems()
}



function setup() {
    comeBackSound.setVolume(0.5)
    createCanvas(900, 700)
    mouseObject = new Mouse()
    textAlign(CENTER, CENTER)
    textSize(STYLE.textSize)
    noCursor()
    noStroke()

    STYLE.buttonSize = height - (STYLE.orchard.height + 3 * STYLE.margin)
    STYLE.orchard.viewY += STYLE.textSize + STYLE.margin

    STYLE.itemInShopSize = (STYLE.orchard.height - textSize() - (STYLE.margin * 4)) / 3
    STYLE.treeSpotSize = 100

    STYLE.inventory.width = width - 620 - 10
    if (!orchard) orchard = new Orchard()
    shop = new Shop(10, 10, width - 20, height - 30 - STYLE.buttonSize)
    workshop = new Workshop(10, 10, width - 20, height - 30 - STYLE.buttonSize)
    upgrades = new Upgrades(10, 10, width - 20, height - 30 - STYLE.buttonSize)
    settings = new Settings()


    setupButtons();
    loadGame(mainSave)
}

function draw() {
    background(128)
    if (views.shop) {
        shop.show()
    } else if (views.workshop) {
        workshop.show()
    } else if (views.upgrades) {
        upgrades.show()
        upgrades.setupUpgrades()
    } else {
        orchard.show()
        if (views.settings) {
            settings.show()
        } else {
            inventory.show()
        }

    }

    for (const button in buttons) {
        buttons[button].show()
    }
    if (running && oldTickTime < Date.now()) {
        tick()
        oldTickTime = Date.now() + newTickEveryMS;
    }
    if (views.win) {
        background(255)
        fill(0)
        text("YOU WIN!!!", width / 2, textSize())
        text("Please Share your time in the comments :)", width / 2, textSize()*2)
        let timeDiff = gameWonAt - gameStartedAt
        text(`It took you ${timeParser(timeDiff)}, nice!`, width / 2, textSize() * 3)
        for (const button in winButtons) {
            winButtons[button].show()
        }
    }
    mouseObject.show()
}

function keyPressed() {
    if (keyCode == 109) {
        debugMode = !debugMode
    }
}
function mouseClicked() {
    for (const button in buttons) {
        buttons[button].isClicked()
    }

    if (views.win) {
        for (const button in winButtons) {
            winButtons[button].isClicked()
        }
    } else if (views.shop) {
        shop.isClicked()
    } else if (views.workshop) {
        workshop.isClicked()
    } else if (views.upgrades) {
        upgrades.isClicked()
    } else if (views.orchard || views.settings || views.inventory) {
        orchard.isClicked()
        if (views.settings) {
            settings.isClicked()
        }
        else {
            inventory.isClicked()
        }
    }
}


function tick() {
    if (checkWin() && !continuePlay) {
        if (gameWonAt == 0) {
            gameWonAt = Date.now()
            continuePlayButton = new Button(200, 100, 100, 100, () => {
                continuePlay = true;
                openView("orchard")
            })
        }
        openView("win")
    }
    orchard.tick()
    mouseObject.tick()
    tickCounter++
}