let newTickEveryMS=50
let oldTickTime=Date.now()
let running =true
tickCounter=0
const STYLE={
    textSize:30,
    margin:10,
    buttonSize:50,
    treeSpotSize:undefined,
    orchard:{
        x:10,y:10,width:600,height:600,
        viewX:10,viewY:10
    },
    inventory:{
        x:620,y:10,width:0,height:600,
        viewOffsetX:0,viewOffsetY:40
    },
    itemHeightInInventory:50
}
let orchard
let inventory
let button
let money
let saplings
let treeSheet,coinImage,saplingImage
function preload(){
    treeSheet=loadImage('assets/TreeSheet.png')
    saplingImage=loadImage('assets/TreeIcon.png')
    coinImage=loadImage('assets/coin.png')
}


function setup(){
    createCanvas(900,700)
    money=new Item("Money",0,coinImage)
    saplings=new Item("Saplings",20,saplingImage)
    textAlign(CENTER,CENTER)
    textSize(STYLE.textSize)
    STYLE.buttonSize=height-(STYLE.orchard.height+3*STYLE.margin)
    STYLE.treeSpotSize=(STYLE.orchard.height/3)-(3*STYLE.margin)
    STYLE.orchard.viewY+=STYLE.textSize+STYLE.margin
    STYLE.inventory.width=width-620-10
    orchard =new Orchard()
    inventory=new Inventory()
    inventory.items.push(money)
    inventory.items.push(saplings)
    button=new Button(10,620)
}
function draw(){
    background(128)
    orchard.show()
    
    button.show()
    inventory.show()
    if (running && oldTickTime < Date.now()) {
        orchard.tick()
        oldTickTime = Date.now() + newTickEveryMS;
    }

}

function mouseClicked(){
    orchard.isClicked()
    inventory.isClicked()
}