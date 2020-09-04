class Turret {
    constructor(ctx, posX, posY, canvasWidth, canvasHeight, ) {
        this.ctx = ctx
        this.turretPos = {
            x: posX,
            y: posY
        }
        this.turretSize = {
            width: 70,
            height: 100
        }
        this.framesCounter = 0
        this.canvasSize = {
            width: canvasWidth,
            height: canvasHeight
        }
        this.img = new Image();
        this.img.framesIndex = 0;
        this.img.src = 'img/player_shot.png';
        this.img.frames = 2;
        this.shots = []
    }
    animate(framesCounter) {
        if (framesCounter % 15 == 0) {
            this.img.framesIndex++;
        }
        if (this.img.framesIndex > this.img.frames - 1) {
            this.img.framesIndex = 0;
        }
    }
    move(dir) {
        if (dir === 'left' && this.turretPos.x >= 10) {
            this.turretPos.x -= 15
        } else if (dir === 'right' && this.turretPos.x <= this.canvasSize.width - 60) {
            this.turretPos.x += 15
        } else {
            null
        }
    }
    draw(framesCounter) {
        this.ctx.drawImage(this.img,
            this.img.framesIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.turretPos.x,
            this.turretPos.y,
            this.turretSize.width,
            this.turretSize.height)
        this.animate(framesCounter)
        this.shots.forEach(elm => elm.draw())
        this.clearShots()
    }
    shoot() {
        this.shots.push(new Shot(this.ctx, this.turretPos.x, this.turretPos.y, this.canvasSize.height, "turretShot.png"))
    }
    clearShots() {
        this.shots = this.shots.filter(shot => shot.position.y >= -10)
    }
}