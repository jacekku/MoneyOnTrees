function pointInsideRect(x, y, x1, y1, w, h) {
    return x > x1 &&
        x < x1 + w &&
        y > y1 &&
        y < y1 + h
}

function mouseInsideRect(x, y, w, h) {
    return pointInsideRect(mouseX, mouseY, x, y, w, h)
}


leftPageAt = Date.now()
document.onvisibilitychange = function () {
    if (document.visibilityState == "hidden") {
        leftPageAt = Date.now()
        saveGame()
    } else {
        let missedTicks = Math.floor((Date.now() - leftPageAt) / newTickEveryMS)
        for (let i = 0; i < missedTicks; i++) {
            tick()
        }
    }
}
window.addEventListener("unload", () => {
   // if (localStorage.length == 0) {} else saveGame()
})



function loadAllImages() {
    images = {
        treeSheet: loadImage('assets/TreeSheet.png'),
        saplingImage: loadImage('assets/sapling.png'),
        coinImage: loadImage('assets/coin.png'),
        shopImage: loadImage('assets/shop.png'),
        groundImage: loadImage('assets/ground.png'),
        plankBackgroundImage: loadImage('assets/plankBackground.png'),
        woodFrame: loadImage('assets/woodFrame.png'),
        buyButtonImage: loadImage('assets/buyButton.png'),
        notBuyButtonImage: loadImage('assets/notBuyButton.png'),
        sellButtonImage: loadImage('assets/sellButton.png'),
        logImage: loadImage('assets/log.png'),
        plankImage: loadImage('assets/planks.png'),
        harvestImage: loadImage('assets/harvest.png')
    }
}




function setupActions() {
    let Actions = {
        NOTHING: {
            id: 0,
            image: null
        },
        HARVEST: {
            id: 1,
            image: images.harvestImage || "harvestImage"
        },
        PLANT: {
            id: 2,
            image: images.saplingImage || "saplingImage"
        }
    };
    return Actions
}



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

Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}


function recastObjects(items, ClassName) {
    for (const item in items) {
        items[item] = recastObject(items[item], ClassName)
    }
    return items
}

function recastObject(item, className) {
    let formatter={
        "Orchard":Orchard,
        "TreeSpot":TreeSpot
    }
    let temp = new formatter[className]()
    for (const field in item) {
        temp[field] = item[field]
    }
    return temp
}


//what to save?
/**
 * ticknumber
 * item amounts
 * orchardState
 * 
 * 
 * 
 */
function saveGame() {
    let saveObject = {
        tickCounter,
        itemsAmounts:getAmounts(),
        treeSpotStates:orchard.getTreeSpotStates()
    }
    console.log("saving", saveObject)
    localStorage.setObject("saveFile", saveObject)
}



function loadGame() {
    let saveObject = localStorage.getObject("saveFile")
    if (saveObject == null) {
        // saveGame()
    } else {
        console.log("loading",saveObject)
        tickCounter = saveObject.tickCounter
        setAmounts(saveObject.itemsAmounts)
        orchard.setTreeSpotStates(saveObject.treeSpotStates)
    }
}

function hardResetGame() {
    localStorage.clear()
    items=setupItems()
    ticksCounter=0
    saveGame()
    loadGame()
}