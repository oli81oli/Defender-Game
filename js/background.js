class Background {
    constructor(ctx, posX, posY, canvasWidth, canvasHeight, imgName) {
        this.ctx = ctx
        this.backgroundPos = {
            x: posX,
            y: posY
        }
        this.backgroundSize = {
            width: canvasWidth,
            height: canvasHeight
        }
        this.img = new Image()
        this.img.src = `img/${imgName}`
    }

    draw() {
        this.ctx.drawImage(this.img, this.backgroundPos.x, this.backgroundPos.y, this.backgroundSize.width, this.backgroundSize.height)
    }
}