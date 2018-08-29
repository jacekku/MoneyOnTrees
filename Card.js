class Card {
    constructor(x, y, width, height) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.subSpaces = this.generateSubSpaces()
    }
    generateSubSpaces() {
        return {
            topLeft: {
                id: 0,
                x: this.x,
                y: this.y,
                width: this.width / 2,
                height: this.height / 2,
            },
            topRight: {
                id: 1,
                x: this.x + this.width / 2,
                y: this.y,
                width: this.width / 2,
                height: this.height / 2,
            },
            bottomRight: {
                id: 2,
                x: this.x + this.width / 2,
                y: this.y + this.height / 2,
                width: this.width / 2,
                height: this.height / 2,
            },
            bottomLeft: {
                id: 3,
                x: this.x,
                y: this.y + this.height / 2,
                width: this.width / 2,
                height: this.height / 2,
            },
            top: {
                id: 4,
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height / 2,
            },
            right: {
                id: 5,
                x: this.x + this.width / 2,
                y: this.y,
                width: this.width / 2,
                height: this.height,
            },
            bottom: {
                id: 6,
                x: this.x,
                y: this.y + this.height / 2,
                width: this.width,
                height: this.height / 2,
            },
            left: {
                id: 7,
                x: this.x,
                y: this.y,
                width: this.width / 2,
                height: this.height,
            },
        }
    }
    showBackground() {
        rect(this.x, this.y, this.width, this.height)
    }
    showSubSpace(subSpaceName){
        let subSpace=this.subSpaces[subSpaceName]
        if(subSpace.show)subSpace.show(...subSpace.showArgs)
        else rect(subSpace.x,subSpace.y,subSpace.width,subSpace.height)

    }
    setSubSpaceShow(subSpaceName,showFun,...args){
        let subSpace=this.subSpaces[subSpaceName]
        subSpace.show=showFun
        subSpace.showArgs=[...args]
    }
}