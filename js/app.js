const game = {
    name: "Ironhack Defender",
    description: "Defense videogame",
    version: "0.2",
    authors: "Aitor Martinez & Oliver Blanco",
    license: undefined,
    canvas: undefined,
    ctx: undefined,
    framesCounter: 0,
    FPS: 60,
    turret: undefined,
    shot: undefined,
    boss: [],
    missiles: [],
    parachutes: [],
    kit: [],
    bonusTarget: [],
    explosion: [],
    kitExplosion: [],
    audio: {
        shoot: new Audio('./bso/NFF-toy-gun.wav'),
        explosion: new Audio('./bso/NFF-shut-down.wav'),
        parachutesImpact: new Audio('./bso/NFF-kid-attack.wav'),
        parachutesGain: new Audio('./bso/NFF-iron-tickle.wav'),
        kit: new Audio('./bso/NFF-good-tip-low.wav'),
        bonusTarget: new Audio('./bso/NFF-alien-react.wav'),
    },
    pointsCounter: 0,
    lifesCounter: 5,
    cityCounter: 0,
    background: undefined,
    overlay: undefined,
    canvasSize: {
        w: 900,
        h: 700,
    },
    intervalID: undefined,

    init() {
        this.canvas = document.querySelector("canvas")
        this.ctx = canvas.getContext("2d")
        this.pointsCounter = 0
        this.lifesCounter = 5
        this.turret = undefined
        this.setDimensions();
        this.start();
        this.setEventListeners()
    },
    setDimensions() {
        this.canvas.setAttribute("width", this.canvasSize.w)
        this.canvas.setAttribute("height", this.canvasSize.h)
    },

    start() {
        this.reset()
        this.intervalID = setInterval(() => {
            if (this.framesCounter > 5000) {
                this.framesCounter = 0
            } else {
                this.framesCounter++
            }
            this.clear()
            this.drawAll()
            this.drawCounters()
            this.generateDrops()
            this.clearDrops()
            this.missilesColission()
            this.parachutesColission()
            this.bossColission()
            this.destroyCity()
            this.kitCollision()
            this.bonusTargetColission()
            this.winOrLoose()
        }, 1000 / this.FPS);
    },
  
    drawAll() {
        this.background.draw()
        this.overlay.draw()
        this.turret.draw(this.framesCounter)
        this.missiles.forEach(elm => elm.draw(this.framesCounter))
        this.parachutes.forEach(elm => elm.draw())
        this.boss.forEach(elm => elm.draw())
        this.kit.forEach(elm => elm.draw())
        this.bonusTarget.forEach(elm => elm.draw())
        this.explosion.forEach(elm => elm.draw(this.framesCounter))
        this.kitExplosion.forEach(elm => elm.draw(this.framesCounter))
    },

    destroyCity() {
        if (this.cityCounter === 1) {
            this.overlay.imgName = "cityBackground2.png"
        } else if (this.cityCounter === 2) {
            this.overlay.imgName = "cityBackground3.png"
        } else if (this.cityCounter >= 3) {
            this.overlay.imgName = "cityBackground4.png"
        }
    },

    isDestroyed() {
        if (this.cityCounter === 0) {
            this.pointsCounter += 600
        } else if (this.cityCounter === 1) {
            this.pointsCounter += 400
        } else if (this.cityCounter === 2) {
            this.pointsCounter += 200
        } else if (this.cityCounter >= 3) {
            this.pointsCounter -= 400
        }

    },

    drawCounters() {
        document.querySelector(".points").innerHTML = this.pointsCounter
        document.querySelector(".lifes").innerHTML = this.lifesCounter

        document.querySelector(".bad-points").innerHTML = this.pointsCounter
        document.querySelector(".good-points").innerHTML = this.pointsCounter
        document.querySelector(".bad-lifes").innerHTML = 0
        document.querySelector(".good-lifes").innerHTML = this.lifesCounter
    },

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },

    generateDrops() {
        if (this.framesCounter % 180 === 0) {
            this.missiles.push(new Missile(this.ctx, this.canvasSize.w, this.canvasSize.h, 1, 10, 1, "missilesAnimation.png"))
        }
        if (this.framesCounter % 300 === 0) {
            this.missiles.push(new Missile(this.ctx, this.canvasSize.w, this.canvasSize.h, 0.7, 20, 2, "shotgunAnimation.png"))
        }
        if (this.framesCounter % 1000 === 0) {
            this.missiles.push(new Missile(this.ctx, this.canvasSize.w, this.canvasSize.h, 1.7, 30, 1, "sniperAnimation.png"))
        }
        if (this.framesCounter % 500 === 0) {
            this.parachutes.push(new Parachute(this.ctx, this.canvasSize.w, this.canvasSize.h, 1.3, 50, "hostage.png"))
        }
        if (this.framesCounter % 3000 === 0) {
            this.boss.push(new Boss(this.ctx, this.canvasSize.w, this.canvasSize.h, 0.3, 500, "boss.gif"))
        }
        if (this.framesCounter % 800 === 0) {
            this.kit.push(new Kit(this.ctx, 2, 1, "syringe.gif"))
        }
        if (this.framesCounter % 1400 === 0) {
            this.bonusTarget.push(new BonusTarget(this.ctx, 1.5, 350, "bonus.png"))
        }
    },

    clearDrops() {
        this.missiles.forEach(elm => {
            if (elm.position.y >= 650 && this.lifesCounter === 1) {
                this.lifesCounter = 0
                this.cityCounter += 1
                this.audio.explosion.play()
                this.explosion.push(new Explosion(this.ctx, elm.position.x, elm.position.y, 'explosionSheet.png'))
            } else if (elm.position.y >= 650) {
                this.lifesCounter -= elm.damage
                this.cityCounter += 1
                this.audio.explosion.play()
                this.explosion.push(new Explosion(this.ctx, elm.position.x, elm.position.y, 'explosionSheet.png'))
            }
        })
        this.missiles = this.missiles.filter(miss => miss.position.y < 650)

        this.parachutes.forEach(elm => {
            if (elm.position.y >= 640) {
                this.audio.parachutesGain.play()
                this.pointsCounter += elm.points
                
            }
        })
        this.parachutes = this.parachutes.filter(para => para.position.y <= 640)

        this.boss.forEach(elm => {
            if (elm.position.y >= 550) {
                this.lifesCounter = 0
                this.cityCounter = 3

            }
        })
        this.boss = this.boss.filter(para => para.position.y < 550)

        this.kit = this.kit.filter(para => para.position.y < 695)

        this.bonusTarget = this.bonusTarget.filter(para => para.position.x < 900)

        this.clearExplosion()
    },

    reset() {
        this.turret = new Turret(this.ctx, this.canvasSize.w / 2 -30, this.canvasSize.h - 100, this.canvasSize.w, this.canvasSize.h, "germantastico2.png")
        this.background = new Background(this.ctx, 0, 0, this.canvasSize.w, this.canvasSize.h, "gameBackground.jpeg")
        this.overlay = new Background(this.ctx, 0, 550, this.canvasSize.w, 150, "cityBackground.png")
    }, 

    collision(elm1, elm2) {
        if (elm1.position.x < elm2.position.x + elm2.size.width &&
            elm1.position.x + elm1.size.width > elm2.position.x &&
            elm1.position.y < elm2.position.y + elm2.size.height &&
            elm1.position.y + elm1.size.height > elm2.position.y) {
            return true
        }
    },

    missilesColission() {
        this.turret.shots.forEach(elm2 => {
            this.missiles.forEach(elm1 => {
                if (this.collision(elm1, elm2) === true) {
                    this.audio.explosion.play()
                    this.explosion.push(new Explosion(this.ctx, elm1.position.x, elm1.position.y, 'explosionSheet.png'))
                    const elm1Index = this.missiles.indexOf(elm1)
                    this.missiles.splice(elm1Index, 1)
                    const elm2Index = this.turret.shots.indexOf(elm2)
                    this.turret.shots.splice(elm2Index, 1)
                    this.pointsCounter += elm1.points
                }
            })
        })
    },

    parachutesColission() {
        this.turret.shots.forEach(elm2 => {
            this.parachutes.forEach(elm1 => {
                if (this.collision(elm1, elm2) === true) {
                    this.audio.parachutesImpact.play()
                    const elm1Index = this.parachutes.indexOf(elm1)
                    this.parachutes.splice(elm1Index, 1)
                    const elm2Index = this.turret.shots.indexOf(elm2)
                    this.turret.shots.splice(elm2Index, 1)
                    if (this.pointsCounter >= 100) {
                        this.pointsCounter -= 100
                    } else {
                        this.pointsCounter = 0

                    }
                }
            })
        })
    },

    bossColission() {
        this.turret.shots.forEach(elm2 => {
            this.boss.forEach(elm1 => {
                if (this.collision(elm1, elm2) === true) {
                    const elm2Index = this.turret.shots.indexOf(elm2)
                    this.turret.shots.splice(elm2Index, 1)
                    elm1.lifesCounter -= 1
                    if (elm1.lifesCounter === 1) {
                        this.pointsCounter += elm1.points
                        if (this.cityCounter === 0) {
                            this.pointsCounter += 600
                        } else if (this.cityCounter === 1) {
                            this.pointsCounter += 400
                        } else if (this.cityCounter === 2) {
                            this.pointsCounter += 200
                        } else if (this.cityCounter >= 3) {
                            this.pointsCounter -= 400
                        }
                    }
                }
            })
        })
    },

    kitCollision() {
        this.turret.shots.forEach(elm2 => {
            this.kit.forEach(elm1 => {
                if (this.collision(elm1, elm2) === true) {
                    this.audio.kit.play()
                    this.kitExplosion.push(new KitExplosion(this.ctx, elm1.position.x, elm1.position.y, 'healingSheet.png'))
                    const elm2Index = this.turret.shots.indexOf(elm2)
                    this.turret.shots.splice(elm2Index, 1)
                    const elm1Index = this.kit.indexOf(elm1)
                    this.kit.splice(elm1Index, 1)
                    this.lifesCounter += 1
                }
            })
        })
    },

    bonusTargetColission() {
        this.turret.shots.forEach(elm2 => {
            this.bonusTarget.forEach(elm1 => {
                if (this.collision(elm1, elm2) === true) {
                    const elm2Index = this.turret.shots.indexOf(elm2)
                    this.turret.shots.splice(elm2Index, 1)
                    elm1.lifesCounter -= 1
                    if (elm1.lifesCounter === 0) {
                        this.explosion.push(new Explosion(this.ctx, elm1.position.x, elm1.position.y, 'explosionSheet.png'))
                        this.audio.bonusTarget.play()
                        this.pointsCounter += elm1.points
                        const elm1Index = this.bonusTarget.indexOf(elm1)
                        this.bonusTarget.splice(elm1Index, 1)
                    }
                }
            })
        })
    },

    clearExplosion() {
        this.explosion.forEach(elm => {
            if (elm.img.framesIndex === 15) {
                const elementIndex = this.explosion.indexOf(elm)
                this.explosion.splice(elementIndex, 1)
            }
        })
        this.kitExplosion.forEach(elm => {
            if (elm.img.framesIndex === 24) {
                const elementIndex = this.kitExplosion.indexOf(elm)
                this.kitExplosion.splice(elementIndex, 1)
            }
        })
    },

     setEventListeners() {
         document.onkeydown = e => {
             if (e.keyCode === 37) {
                 this.turret.move('left')
                 this.turret.img.src = 'img/player_left.png';
                 this.turret.img.frames = 4;
             }
             if (e.keyCode === 39) {
                 this.turret.move('right')
                 this.turret.img.src = 'img/player_right.png';
                 this.turret.img.frames = 4;
             }
         }
         document.addEventListener("keyup", e => {
             e.keyCode === 32 ? this.turret.shoot() : null
             e.keyCode === 32 ? this.audio.shoot.play() : null
             if (e.keyCode === 37) {
                 this.turret.img.src = 'img/player_shot.png';
                 this.turret.img.frames = 2;
             }
             if (e.keyCode === 39) {
                 this.turret.img.src = 'img/player_shot.png';
                 this.turret.img.frames = 2;
             }
         });
     },

    winOrLoose() {
        if (this.lifesCounter === 0) {
            document.querySelector('.board').style.display = 'none'
            document.querySelector('.bad-ending').style.display = 'block'

            const audio = document.querySelector('audio')
            document.querySelector('.hero').removeChild(audio)
            
            const winTheme = document.createElement('audio')
            winTheme.setAttribute("src", "bso/loseTheme.mp3")
            winTheme.setAttribute("loop", true)
            winTheme.setAttribute("autoplay", true)
            document.querySelector('.hero').appendChild(winTheme)

            this.restartGame()
        }
        this.boss.forEach(elm => {
            if (elm.lifesCounter === 0) {
                document.querySelector('.board').style.display = 'none'
                document.querySelector('.good-ending').style.display = 'block'

                const audio = document.querySelector('audio')
                document.querySelector('.hero').removeChild(audio)

                const loseTheme = document.createElement('audio')
                loseTheme.setAttribute("src", "bso/winTheme.mp3")
                loseTheme.setAttribute("loop", true)
                loseTheme.setAttribute("autoplay", true)
                document.querySelector('.hero').appendChild(loseTheme)

                this.restartGame()

            } 
        })
    },

    restartGame() {
        clearInterval(this.intervalID)
        this.missiles = []
        this.parachutes = []
        this.boss = []
        this.turret.shots = []
    }
};
