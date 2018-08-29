class Upgrades{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.width=w
        this.height=h
    }
    show(){
        drawView(this.x, this.y, this.width, this.height,"UPGRADES")
        let cardSize=STYLE.itemInShopSize
        let card = new Card(this.x,this.y,cardSize,cardSize)
        fill("#fff")
        card.showBackground()
        fill("#f0f")
        card.setSubSpaceShow("bottomRight",function(){fill(0);rect(this.x,this.x,10,10)})
        card.showSubSpace("bottomRight")
        // drawUpgrades()
    }

    drawUpgrades(){
        let cardSize=STYLE.itemInShopSize
    }
}