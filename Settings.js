class Settings {
    constructor() {
        this.settings = {
            reset: {
                onClick: hardResetGame,
                image: images.reset,
                button:{}
            },
            sound: {
                onClick: null,
                image: images.sound,
                button:{}
            }
        }
    }
    show() {

        let bound = STYLE.inventory
        drawView(bound.x, bound.y, bound.width, bound.height,"SETTINGS")

        //show options
        push()
        translate(620, bound.y + textSize())
        textSize(20)
        textAlign(LEFT)
        for (let setting in this.settings) {
            fill(255)
            rect(0, 0, STYLE.inventory.width, STYLE.itemHeightInInventory)
            fill(0)

            image(this.settings[setting].image, 0, 0, STYLE.itemHeightInInventory, STYLE.itemHeightInInventory)

            text(setting.toUpperCase(), STYLE.itemHeightInInventory + 1, textSize())
            translate(0, STYLE.itemHeightInInventory)
        }
        pop()
    }
    isClicked() {
        this.updateButtons()
        for (let setting in this.settings) {
            if(this.settings[setting].button.isClicked()){
                this.settings[setting].onClick()
            }
        }
    }
    updateButtons() {
        let bound = STYLE.inventory
        let itemHeight = STYLE.itemHeightInInventory
        let index = 0
        for (let setting in this.settings) {
            let item = this.settings[setting]
            item.button=new Button(bound.x, bound.y + textSize() + (index * itemHeight), bound.width, itemHeight)
            index++
        }
    }
}