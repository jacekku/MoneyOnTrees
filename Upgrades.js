class Upgrades{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.width=w
        this.heigth=h
    }
    show(){
        drawView(this.x, this.y, this.width, this.heigth,"UPGRADES")
        
    }
}