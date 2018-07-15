class Mover {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.drawX = this.x
        this.drawY = this.y
        this.velocityX = 1
        this.velocityY = 1
        this.targetX
        this.targetY
    }
    show() {
        this.moveInTick(this.velocityX,this.velocityY)
        fill(255)
        rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize)
        fill(0,128)
        rect(this.targetX* cellSize,this.targetY*cellSize,cellSize,cellSize)
        fill(0)
        rect(this.drawX, this.drawY, cellSize, cellSize)

    }

    moveInTick(x, y) {
        let distance=1/4

        this.drawX += (x*distance)
        this.drawY += (y*distance)
    }
    moveOneCell(x, y) {
        this.x += x
        this.y += y
        this.drawX = this.x*cellSize
        this.drawY = this.y*cellSize
    }
    setDirection(x,y){
        this.velocityX=x
        this.velocityY=y
        this.moveOneCell(x,y)
    }
    moveHandler() {
        if (this.x < this.targetX) this.setDirection(1, 0)
        else if (this.x > this.targetX) this.setDirection(-1, 0)
        else if (this.y < this.targetY) this.setDirection(0, 1)
        else if (this.y > this.targetY) this.setDirection(0, -1)
        else if (this.x == this.targetX && this.y == this.targetY) this.pickRandom()
    }
    tick() {
        if (this.x == this.targetX && this.y == this.targetY) this.pickRandom()
        this.moveHandler()
    }
    pickRandom() {
        this.targetX = Math.floor(random(width) / cellSize)
        this.targetY = Math.floor(random(height) / cellSize)
    }

}