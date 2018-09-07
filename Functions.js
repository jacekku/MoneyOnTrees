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
        soundOn: loadImage('assets/soundOn.png'),
        soundOff: loadImage('assets/soundOff.png'),


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
winButtons={

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
    winButtons.resetButton = new Button(width/2-400, textSize()*4, 100, 100,()=> hardResetGame(1))
    winButtons.resetButton.setImage(images.reset)
    winButtons.continuePlayButton = new Button(width/2+300, textSize()*4, 100, 100, () => {
        continuePlay = true;
        openView("orchard")
        buttons.win = new Button(STYLE.buttonX + STYLE.margin * 9 + STYLE.buttonSize * 9, STYLE.buttonY);
        buttons.win.setImage(images.settings);
        buttons.win.setOnClick(function () {openView("win");}); 
    })
    winButtons.continuePlayButton.setImage(images.harvestImage)
}
function onePlateuGraph(x){
    return 1- ((3.361344538e-4*(x**3)) - (5.042016807e-2*(x**2)) + (2.680672269*x-5.456968211e-12))/100
}
function linearGraph(x){
    return x
}
function linearGenerator(angle,base){
    return function(x){return angle*x+base}
}
function exponentialGenerator(base,start,multiplicator){
    return function(x){return (base**x)*multiplicator + start}
}

function setupActionTimes(){
    let times = {
        reset: false, //CHECK BEFORE UPDATE (false)
        plantSpeed: {
            base: 300,
            level: 1,
            upgradePerLevel: linearGraph,
            pricingPerLevel: linearGraph
        },
        harvestSpeed: {
            base: 2000,
            level: 0,
            maxLevel: 100,
            upgradePerLevel: onePlateuGraph,
            pricingPerLevel: linearGenerator(1000, 2000)
        },
        chopSpeed: {
            base: 2000,
            level: 0,
            maxLevel: 100,
            upgradePerLevel: onePlateuGraph,
            pricingPerLevel: linearGenerator(100, 100)
        },
        treeYield: {
            base: 1,
            level: 0,
            upgradePerLevel: linearGenerator(1, 1),
            floor: true,
            pricingPerLevel: exponentialGenerator(1.7, -500, 1000)
        },
        fruitYield: {
            base: 1,
            level: 0,
            upgradePerLevel: linearGenerator(1, 1),
            floor: true,
            pricingPerLevel: exponentialGenerator(2.5, 10000, 10000)
        },
        sellPrice: {
            base: 1,
            level: 1,
            upgradePerLevel: linearGraph,
            pricingPerLevel: linearGenerator(10000, 10000)
        },
        growthSpeed: {
            base: 1,
            level: 0,
            upgradePerLevel: linearGenerator(0.05, 1),
            floor: false,
            pricingPerLevel: linearGenerator(1500, 1000)
        },
    }
    times=calculateActionTimes(times)
    return times
}
function calculateActionTimes(times){
    for(let speed in times){
        speed=times[speed]
        if(typeof speed.upgradePerLevel == "function")speed.actualSpeed=speed.base*speed.upgradePerLevel(speed.level)
        else speed.actualSpeed=speed.base*(speed.upgradePerLevel**speed.level)
        speed.subLevelSpeed=speed.actualSpeed
        if(speed.floor){
            speed.actualSpeed=Math.floor(speed.actualSpeed)
        }
    }
    return times
}
function loadActionTimes(times){
    if(actionTimes.reset)return calculateActionTimes(actionTimes) 
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
    if(level)action.level=level
    else action.level+=action.level+1<=(action.maxLevel||Infinity)?1:0 // OH MY GOD THIS IS SO UNREADABLE
    actionTimes=calculateActionTimes(actionTimes)
}
function buyUpgrade(action){
    if(typeof action=="string"){
        action=actionTimes[action]
    }
    if(action.level==action.maxLevel)return false
    if(items.money.subtractAmount(Math.round(action.pricingPerLevel(action.level)))){
        setActionLevel(action)
        return true
    }else{
        return false
    }
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
        simulateTicks()
    } else {
        catchUpOnTicks(leftPageAt)
        clearTimeout(soundPlayTimeoutID)
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
        actionTimes,
        gameStartedAt,
        gameWonAt
    }
    console.log("saving "+saveName, saveObject)
    localStorage.setObject(saveName, saveObject)
}



function loadGame(saveName) {
    let saveObject = localStorage.getObject(saveName)
    if (saveObject == null) {
        hardResetGame()
    } else {
        console.log("loading "+saveName,saveObject)
        orchard=new Orchard()
        tickCounter = saveObject.tickCounter
        setAmounts(saveObject.itemsAmounts)
        orchard.setTreeSpotStates(saveObject.treeSpotStates)
        leftPageAt=saveObject.leftPageAt
        actionTimes=loadActionTimes(saveObject.actionTimes||setupActionTimes())
        gameStartedAt=saveObject.gameStartedAt||Date.now()
        gameWonAt=saveObject.gameWonAt||0

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

function hardResetGame(timesToReset=0) {// refactor this, maybe add a function that remakes all the variables
    console.log("RESTART")
    localStorage.clear()
    tickCounter=0
    gameStartedAt=Date.now()
    gameWonAt=0
    preload()
    saveGame("mainSave")
    loadGame("mainSave")
    setupButtons()
    orchard=new Orchard()
    inventory=new Inventory(...items.iterator)
    mouseObject.setAction(Actions.NOTHING)

    openView("orchard")
    if(timesToReset>0)hardResetGame(timesToReset-1)
}
function exportSave(saveName="mainSave"){
    saveStrings([localStorage[saveName]],saveName+".txt")
}

let views={
    orchard:true,
    workshop:false,
    shop:false,
    settings:false,
    upgrades:false,
    win:false
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

function simulateTicks(){
    let ticksToGo=orchard.treeSpots.filter(e=>e.tree).map(e=>e.tree.getTicksToFullyGrown())
    let max=Math.max(...ticksToGo)
    let min=Math.min(...ticksToGo)
    if(comeBackType=="all"){if(max>0)soundPlayTimeoutID=setTimeout(handleSound,max*newTickEveryMS)}
    else soundPlayTimeoutID=setTimeout(handleSound,min*newTickEveryMS)
}

comeBackType="all"
plantedTrees=0
grownTrees=0

function handleSound(soundToPlay){
    if(!soundEnabled)return
    comeBackSound.play()
}


function soundEnable(){
    soundEnabled=!soundEnabled
    if(soundEnabled)settings.settings.sound.image=images.soundOn
    else settings.settings.sound.image=images.soundOff
    // handleSound(sound.buttonClicked)
    handleSound()
}

function checkWin(){
    return orchard.treeSpots.filter(e=>e.tree).filter(e=>e.tree.type=="cherry").length==orchard.treeSpots.length
}

function timeParser(milis){
    milisInSecond=1000
    secondsInMinute=60
    minutesInHour=60
    hoursInDays=24
    
    days=milis/(hoursInDays*minutesInHour*secondsInMinute*milisInSecond)
    hours=milis/(minutesInHour*secondsInMinute*milisInSecond)
    minutes=milis/(secondsInMinute*milisInSecond)
    seconds=milis/(milisInSecond)

    return `${Math.floor(days)} days ${Math.floor(hours%hoursInDays)} hours ${Math.floor(minutes%minutesInHour)} minutes ${Math.floor(seconds%secondsInMinute)} seconds`


}