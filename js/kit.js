class Kit {
    constructor(ctx, speed, life, imgName) {
        this.ctx = ctx
        this.position = {
            x: Math.floor(860 * Math.random()),
            y: 0
        }
        this.size = {
            width: 40,
            height: 40
        }
        this.img = new Image()
        this.img.src = `img/${imgName}`
        this.life = life
        this.speed = speed
    }
    move() {
        this.position.y += this.speed
    }
    draw() {
        this.ctx.drawImage(this.img, this.position.x, this.position.y, this.size.width, this.size.height)
        this.move()
    }
}