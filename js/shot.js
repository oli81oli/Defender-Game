class Shot {
    constructor(ctx, turretPosX, turretPosY, CanvasHeight, imgName) {
        this.ctx = ctx
        this.position = {
            x: turretPosX + 16,
            y: turretPosY - 40
        }
        this.size = {
            width: 20,
            height: 60
        }
        this.maxRange = CanvasHeight
        this.img = new Image()
        this.img.src = `img/${imgName}`
    }

    draw() {
        this.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.width, this.size.height)
        this.move()
    }

    move() {
        this.position.y -= 5
    }
}