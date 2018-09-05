class Upgrades{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.width=w
        this.height=h
        this.availableUpgrades=[
            "harvestSpeed","chopSpeed","treeYield","fruitYield","growthSpeed"
        ]
        this.upgradeCards=[]
        this.setupUpgrades()
    }
    setupUpgrades(){
        let cardSize=STYLE.itemInShopSize
        let upgradeIndex=0
        let y = this.y+(STYLE.margin)+textSize()
        let x = this.x+(STYLE.margin)
        this.upgradeCards=[]
        for(let i=1;i<=12;i++){
                if(upgradeIndex==-1)return
                if(upgradeIndex!=-1){
                    let card=new Card(x,y,cardSize,cardSize)
                    this.upgradeCards.push(card)
                    card.name=this.availableUpgrades[upgradeIndex]
                    card.setSubSpaceShow("top", function(availableUpgrades,upgradeIndex){
                        push()
                        fill(0)
                        textSize(20)
                        text(availableUpgrades[upgradeIndex],this.x+this.width/2,this.y+textSize())
                        pop()
                    },this.availableUpgrades,upgradeIndex)

                    let time = calculateActionTimes(actionTimes)[this.availableUpgrades[upgradeIndex]]

                    card.setSubSpaceShow("bottom",function(stringToShow,stringToShow2,stringToShow3,stringToShow4){
                        push()
                        fill(0)
                        textSize(20)
                        
                        text("price: "+stringToShow,this.x+this.width/2,this.y+textSize())
                        text("actual: "+stringToShow2,this.x+this.width/2,this.y+textSize()*2)
                        text("next: "+stringToShow3,this.x+this.width/2,this.y+textSize()*3)
                        text("level: "+stringToShow4,this.x+this.width/2,this.y+textSize()*4)
                        pop() 
                    },time.pricingPerLevel(time.level),
                    time.actualSpeed.toFixed(3),
                    time.level<(time.maxLevel||Infinity)?time.base*time.upgradePerLevel(time.level+1).toFixed(3):"Max Level",
                    time.level
                    )
                    card.button=new Button(card.x,card.y,card.width,card.height,()=>{
                        buyUpgrade(card.name)
                        actionTimes=calculateActionTimes(actionTimes)
                    })
                }

                x+=cardSize+STYLE.margin*5
                if(i%4==0){
                    x=this.x+(STYLE.margin)
                    y+=cardSize+STYLE.margin
                }
                if(upgradeIndex!=-1 && upgradeIndex<this.availableUpgrades.length-1){
                    upgradeIndex++
                }else{upgradeIndex=-1}
            }
    }

    drawUpgrades(){
        for(let card in this.upgradeCards){
            card=this.upgradeCards[card]
            card.showBackground()
            card.showAllSubSpaces()
        }
    }

    show(){
        drawView(this.x, this.y, this.width, this.height,"UPGRADES (work in progress)")
        this.drawUpgrades()
    }
    isClicked() {
        for (let card in this.upgradeCards) {
            card = this.upgradeCards[card]
            if (card.button) {
                if(card.button.isClicked())this.setupUpgrades()
            }
        }
    }

    
}