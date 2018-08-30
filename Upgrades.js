class Upgrades{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.width=w
        this.height=h
        this.availableUpgrades=[
            "harvestSpeed","chopSpeed","treeYield","fruitYield","sellPrice"
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
                    card.setSubSpaceShow("bottom",function(stringToShow){
                        push()
                        fill(0)
                        textSize(20)
                        text("current: "+stringToShow.toFixed(2),this.x+this.width/2,this.y+textSize())
                        pop() 
                    },calculateActionTimes(actionTimes)[this.availableUpgrades[upgradeIndex]].actualSpeed)
                    card.button=new Button(card.x,card.y,card.width,card.height,()=>{
                        console.log(card.name)
                        actionTimes[card.name].level+=1
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