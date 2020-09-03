class KitExplosion {
    constructor(ctx, posX, posY, imgName) {
        this.ctx = ctx
        this.kitExplosionPos = {
            x: posX,
            y: posY
        }
        this.size = {
            width: 70,
            height: 70
        }
        this.img = new Image()
        this.img.src = `img/${imgName}`
        this.img.frames = 25
        this.img.framesIndex = 0
    }
    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.img.framesIndex++;
        }
        if (this.img.framesIndex > this.img.frames - 1) {
            this.img.framesIndex = 0;
        }
    }
    move() {
        this.kitExplosionPosY++
    }
    draw(framesCounter) {
        this.ctx.drawImage(
            this.img,
            this.img.framesIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.kitExplosionPos.x,
            this.kitExplosionPos.y,
            this.size.width,
            this.size.height)
        this.animate(framesCounter)
        this.move()
    }
}