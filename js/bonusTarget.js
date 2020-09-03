class BonusTarget {
    constructor(ctx, speed, points, imgName) {
        this.ctx = ctx
        this.position = {
            x: 0,
            y: Math.floor(300 * Math.random())
        }
        this.size = {
            width: 140,
            height: 62
        }
        this.img = new Image()
        this.img.src = `img/${imgName}`

        this.lifesCounter = 10

        this.points = points
        this.speed = speed
    }
    move() {
        this.position.x += this.speed
    }

    draw() {
        this.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.width, this.size.height)
        this.move()
    }
}