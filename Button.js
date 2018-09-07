class Button{
    constructor(x,y,width,height,onClick){
        this.x=x
        this.y=y
        this.w=width||STYLE.buttonSize
        this.h=height||STYLE.buttonSize
        this.onClick=onClick
        this.image
    }
    setOnClick(onClick){
        this.onClick=onClick
    }
    setImage(image){
        this.image=image
    }
    show(newFill=255){
        push()
        fill(newFill)
        rect(this.x,this.y,this.w,this.h)
        if(this.image){
            imageMode(CORNER)
            image(this.image,this.x,this.y,this.w,this.h)}
        pop()
        return {x:this.x,y:this.y}
    }
    mouseIsInside(){
        return(mouseInsideRect(this.x,this.y,this.w,this.h))
    }

    isClicked(){
        let output=mouseInsideRect(this.x,this.y,this.w,this.h)
        if(output)
            if(this.onClick)this.onClick()
        return output
    }
    setName(name){
        this.name=name
    }
    getName(){
        return this.name
    }

}