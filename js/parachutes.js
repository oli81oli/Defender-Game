class Parachute {
    constructor(ctx, canvasWidth, canvasHeight, speed, points, imgName) {
        this.ctx = ctx
        this.position = {
            x: Math.floor(840 * Math.random()),
            y: 0
        }
        this.size = {
            width: 60,
            height: 75
        }
        this.canvasSize = {
            width: canvasWidth,
            height: canvasHeight
        }

        this.img = new Image()
        this.img.src = `img/${imgName}`
        
        this.speed = speed
        this.points = points
    }

    move() {
        this.position.y += this.speed
    }

    draw() {
        this.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.width, this.size.height)
        this.move()
    }
}