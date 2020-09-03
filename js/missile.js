class Missile {
    constructor(ctx, canvasWidth, canvasHeight, speed, points, damage, imgName) {
        this.ctx = ctx
        this.position = {
            x: Math.floor(860 * Math.random()),
            y: 0
        }
        this.size = {
            width: 30,
            height: 60
        }
        this.canvasSize = {
            width: canvasWidth,
            height: canvasHeight
        }

        this.img = new Image()
        this.img.src = `img/${imgName}`
        this.img.frames = 4
        this.img.framesIndex = 0

        this.damage = damage
        this.speed = speed
        this.points = points
    }

    move() {
        this.position.y += this.speed
    }

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.img.framesIndex++;
        }
        if (this.img.framesIndex > this.img.frames - 1) {
            this.img.framesIndex = 0;
        }
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.img,
            this.img.framesIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height)
        this.animate(framesCounter)
        this.move()
    }
}