function pointInsideRect(x, y, x1, y1, w, h) {
    return x > x1 &&
        x < x1 + w &&
        y > y1 &&
        y < y1 + h
}

function mouseInsideRect(x, y, w, h) {
    return pointInsideRect(mouseX, mouseY, x, y, w, h)
}

function copyObjectFields(target,source){
    for(let f in source){
        target[f]=source[f]
    }
    return target
}





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


        settings: loadImage('assets/settings.png'),
        reset: loadImage('assets/reset.png'),
        sound: loadImage('assets/sound.png'),


        coinImage: loadImage('assets/coin.png'),

        shopImage: loadImage('assets/shop.png'),
        workshopImage: loadImage('assets/workshop.png'),

        upgrades: loadImage('assets/upgrades.png'),


        groundImage: loadImage('assets/ground.png'),
        plankBackgroundImage: loadImage('assets/plankBackground.png'),
        woodFrame: loadImage('assets/woodFrame.png'),
        buyButtonImage: loadImage('assets/buyButton.png'),
        notBuyButtonImage: loadImage('assets/notBuyButton.png'),
        sellButtonImage: loadImage('assets/sellButton.png'),
        harvestImage: loadImage('assets/harvest.png'),
        chopDownImage: loadImage('assets/chop.png'),
    }
}


let buttons={
    harvestButton:{},
    shopButton:{},
    workshopButton:{},
    upgradesButton:{},
    chopDownButton:{},
}
function setupButtons() {
    buttons.harvestButton = new Button(STYLE.buttonX, STYLE.buttonY);
    buttons.harvestButton.setImage(images.harvestImage);
    buttons.harvestButton.setOnClick(function () {
        mouseObject.setAction(Actions.HARVEST);
        openView("orchard");
    });
    buttons.chopDownButton = new Button(STYLE.buttonX + STYLE.margin * 1 + STYLE.buttonSize * 1, STYLE.buttonY);
    buttons.chopDownButton.setImage(images.chopDownImage);
    buttons.chopDownButton.setOnClick(function () {
        mouseObject.setAction(Actions.CHOPDOWN);
        openView("orchard");
    });
    buttons.shopButton = new Button(STYLE.buttonX + STYLE.margin * 2 + STYLE.buttonSize * 2, STYLE.buttonY);
    buttons.shopButton.setImage(images.shopImage);
    buttons.shopButton.setOnClick(function () {
        openView("shop");
    });
    buttons.workshopButton = new Button(STYLE.buttonX + STYLE.margin * 3 + STYLE.buttonSize * 3, STYLE.buttonY);
    buttons.workshopButton.setImage(images.workshopImage);
    buttons.workshopButton.setOnClick(function () {
        openView("workshop");
    });
    buttons.upgradesButton = new Button(STYLE.buttonX + STYLE.margin * 4 + STYLE.buttonSize * 4, STYLE.buttonY);
    buttons.upgradesButton.setImage(images.upgrades);
    buttons.upgradesButton.setOnClick(function () {
        openView("upgrades");
    });
    buttons.settingsButton = new Button(STYLE.buttonX + STYLE.margin * 10 + STYLE.buttonSize * 10, STYLE.buttonY);
    buttons.settingsButton.setImage(images.settings);
    buttons.settingsButton.setOnClick(function () {
        openView("settings");
    });
}

function setupActionTimes(){
    let times={
        plantSpeed:{base:100,level:0,upgradePerLevel:1},
        harvestSpeed:{base:2500,level:0,upgradePerLevel:0.9},
        chopSpeed:{base:5000,level:0,upgradePerLevel:0.9},
        treeYield:{base:1,level:0,upgradePerLevel:1.1,floor:true},
        fruitYield:{base:1,level:0,upgradePerLevel:1.1,floor:true},
        sellPrice:{base:1,level:0,upgradePerLevel:1.01},
    }
    times=calculateActionTimes(times)
    return times
}
function calculateActionTimes(times){
    for(let speed in times){
        speed=times[speed]
        speed.actualSpeed=speed.base*(speed.upgradePerLevel**speed.level)
        if(speed.floor){
            speed.actualSpeed=Math.floor(speed.actualSpeed)
        }
    }
    return times
}
function loadActionTimes(times){
    for(let c in actionTimes){
        if(times[c]){
            actionTimes[c]=copyObjectFields(actionTimes[c], times[c])
        }
    }
    return calculateActionTimes(actionTimes) 
}
function setActionLevel(action,level){
    if(typeof action=="string"){
        action=actionTimes[action]
    }
    action.level=level
    actionTimes=calculateActionTimes(actionTimes)
}


function setupActions() {
    return {
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
        CHOPDOWN:{
            id:3,
            image:images.chopDownImage
        },
    };
}



const STYLE = {
    textSize: 30,
    margin: 10,
    buttonSize: 50,
    buttonX: 10,
    buttonY: 620,
    treeSpotSize: undefined,
    itemInShopSize:undefined,
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

function saveGame(saveName,setMainSave) {
    if(setMainSave && saveName!=mainSave){
        console.log("\n\nSAVE NAME CHANGED TO "+saveName+"\n\n")
        mainSave=saveName
    }
    let saveObject = {
        tickCounter,
        itemsAmounts:getAmounts(),
        treeSpotStates:orchard.getTreeSpotStates(),
        leftPageAt,
        gameVersion,
        resetAfterUpdate,
        actionTimes
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
        actionTimes=loadActionTimes(saveObject.actionTimes||setupActionTimes())
        if(saveName=="mainSave")catchUpOnTicks(leftPageAt)
        
        inventory=new Inventory(...items.iterator)
        if(saveObject.gameVersion==null || saveObject.gameVersion<gameVersion){
            console.error(`Game is out of date current version:${saveObject.gameVersion} update version:${gameVersion}`)
            if(resetAfterUpdate){
                console.log("RESETING")
                console.log("saving oldSave",saveObject)
                saveGame("oldSave",false)
                hardResetGame()
            }
        }
    }
    // saveGame(saveName)
}

function hardResetGame() {// refactor this, maybe add a function that remakes all the variables
    localStorage.clear()
    preload()
    tickCounter=0
    saveGame("mainSave")
    loadGame("mainSave")
    orchard=new Orchard()
    inventory=new Inventory(...items.iterator)
}
function exportSave(saveName="mainSave"){
    saveStrings([localStorage[saveName]],saveName+".txt")
}

let views={
    orchard:true,
    workshop:false,
    shop:false,
    settings:false,
    upgrades:false
}
function drawView(x,y,w,h,viewTitle){
    image(images.plankBackgroundImage,x, y,w+1,textSize()+1)
    image(images.woodFrame,x,y+textSize()+1,w,h-textSize()-1)
    fill(255,245,144)
    text(viewTitle,x+w/2,textSize())
}

function openView(viewToOpen){
    for(let view in views){
        views[view]=false
        
    }
    views[viewToOpen]=true
}