class Button{
    constructor(x,y,width,height,onClick){
        this.x=x
        this.y=y
        this.w=width
        this.h=height
        this.onClick=onClick
    }
    show(){
        fill(255,0,0)
        rect(this.x,this.y,STYLE.buttonSize,STYLE.buttonSize)
    }
    mouseIsInside(){
        return(mouseInsideRect(this.x,this.y,this.w,this.h))
    }

    isClicked(){
        return(mouseInsideRect(this.x,this.y,this.w,this.h))
    }
}