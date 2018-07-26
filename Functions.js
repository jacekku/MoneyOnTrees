function pointInsideRect(x, y, x1, y1, w, h) {
    return x > x1 &&
        x < x1 + w &&
        y > y1 &&
        y < y1 + h
}

function mouseInsideRect(x, y, w, h) {
    return pointInsideRect(mouseX, mouseY, x, y, w, h)
}

function catchUpOnTicks(leftPageAt){
    let missedTicks = Math.floor((Date.now() - leftPageAt) / newTickEveryMS)
    for (let i = 0; i < missedTicks; i++) {
        tick()
    }
}


leftPageAt = Date.now()
let mainSave="mainSave"
document.onvisibilitychange = function () {
    if (document.visibilityState == "hidden") {
        leftPageAt = Date.now()
        saveGame(mainSave)
    } else {
        catchUpOnTicks(leftPageAt)
    }
}
window.addEventListener("unload", () => {
   saveGame(mainSave)
})



function loadAllImages() {
    images = {
        oak_sheet: loadImage    ('assets/trees/oak/oak_sheet.png'),
        oak_sapling: loadImage  ('assets/trees/oak/oak_sapling.png'),
        oak_log: loadImage      ('assets/trees/oak/oak_log.png'),
        oak_plank: loadImage    ('assets/trees/oak/oak_plank.png'),

        pine_sheet: loadImage   ('assets/trees/pine/pine_sheet.png'),
        pine_sapling: loadImage ('assets/trees/pine/pine_sapling.png'),
        pine_log: loadImage     ('assets/trees/pine/pine_log.png'),
        pine_plank: loadImage   ('assets/trees/pine/pine_plank.png'),

        cherry_sheet: loadImage   ('assets/trees/cherry/cherry_sheet.png'),
        cherry_sapling: loadImage ('assets/trees/cherry/cherry_sapling.png'),
        cherry_log: loadImage     ('assets/trees/cherry/cherry_log.png'),
        cherry_plank: loadImage   ('assets/trees/cherry/cherry_plank.png'),
        cherry_fruit: loadImage   ('assets/trees/cherry/cherry_fruit.png'),
        cherry_harvested: loadImage   ('assets/trees/cherry/cherry_harvested.png'),



        coinImage: loadImage('assets/coin.png'),
        shopImage: loadImage('assets/shop.png'),
        groundImage: loadImage('assets/ground.png'),
        plankBackgroundImage: loadImage('assets/plankBackground.png'),
        woodFrame: loadImage('assets/woodFrame.png'),
        buyButtonImage: loadImage('assets/buyButton.png'),
        notBuyButtonImage: loadImage('assets/notBuyButton.png'),
        sellButtonImage: loadImage('assets/sellButton.png'),
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
            image: null,
            plantType:null
        },
        
    };
    return Actions
}
let buttons={
    harvestButton:{},
    shopButton:{}
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

function saveGame(saveName) {
    if(saveName!=mainSave){
        console.log("\n\nSAVE NAME CHANGED TO "+saveName+"\n\n")
        mainSave=saveName
    }
    let saveObject = {
        tickCounter,
        itemsAmounts:getAmounts(),
        treeSpotStates:orchard.getTreeSpotStates(),
        leftPageAt,
        gameVersion,
        resetAfterUpdate
    }
    console.log("saving "+saveName, saveObject)
    localStorage.setObject(saveName, saveObject)
}



function loadGame(saveName) {
    let saveObject = localStorage.getObject(saveName)
    if (saveObject == null) {
        saveGame(saveName)
    } else {
        console.log("loading "+saveName,saveObject)
        orchard=new Orchard()

        tickCounter = saveObject.tickCounter
        setAmounts(saveObject.itemsAmounts)
        orchard.setTreeSpotStates(saveObject.treeSpotStates)
        leftPageAt=saveObject.leftPageAt
        
        if(saveName=="mainSave")catchUpOnTicks(leftPageAt)
        
        inventory=new Inventory(...items.iterator)
        if(saveObject.gameVersion==null || saveObject.gameVersion<gameVersion){
            console.error(`Game is out of date current version:${saveObject.gameVersion} update version:${gameVersion}`)
            if(resetAfterUpdate){
                console.log("RESETING")
                console.log("saving oldSave",saveObject)
                localStorage.setObject("oldSave",saveObject)
                hardResetGame()
            }
        }
    }
}

function hardResetGame() {
    localStorage.clear()
    items=setupItems()
    tickCounter=0
    saveGame("mainSave")
    loadGame("mainSave")
    orchard=new Orchard()
    inventory=new Inventory(...items.iterator)
}