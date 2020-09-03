class Audio {
    constructor(sound) {
        this.sound = sound
    }
    play() {
        const theme = document.querySelector('.shoot')
        theme.setAttribute("src", `${this.sound}`)
        theme.setAttribute("autoplay", true)
    }
}