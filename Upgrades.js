class Upgrades{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.width=w
        this.height=h
        this.availableUpgrades=[
            "harvestSpeed","chopSpeed","treeYield","fruitYield"
        ]
        this.upgradeCards=[]
    }
    drawUpgrades(){
        let cardSize=STYLE.itemInShopSize
        let upgradeIndex=0
        let y = this.y+(STYLE.margin)+textSize()
        let x = this.x+(STYLE.margin)
        for(let i=1;i<=12;i++){
                if(upgradeIndex==-1)return
                if(upgradeIndex!=-1){
                    let card=new Card(x,y,cardSize,cardSize)
                    card.setSubSpaceShow("top", function(availableUpgrades,upgradeIndex){
                        push()
                        fill(0)
                        textSize(20)
                        text(availableUpgrades[upgradeIndex],x+this.width/2,this.y+textSize())
                        pop()
                    },this.availableUpgrades,upgradeIndex)
                    card.showBackground()
                    card.showSubSpace("top")
                }

                x+=cardSize+STYLE.margin
                if(i%4==0){
                    x=this.x+(STYLE.margin)
                    y+=cardSize+STYLE.margin
                }
                if(upgradeIndex!=-1 && upgradeIndex<this.availableUpgrades.length-1){
                    upgradeIndex++
                }else{upgradeIndex=-1}
            }
    }



    show(){
        drawView(this.x, this.y, this.width, this.height,"UPGRADES")
        this.drawUpgrades()
        
        
        
    }

    
}