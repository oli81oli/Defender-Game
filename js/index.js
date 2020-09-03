window.onload = () => {
    document.querySelector('.start').addEventListener('click', startGame)
}
const startGame = () => {
    document.querySelector('.start').style.display = 'none'
    document.querySelector('.hero').style.display = 'none'
    document.querySelector('.board').style.display = 'flex'
    document.querySelector('.counters').style.display = 'block'
    document.querySelector('canvas').style.display = 'block'
    const theme = document.createElement('audio')
    theme.setAttribute("src", "bso/gameTheme.mp3")
    theme.setAttribute("loop", true)
    theme.setAttribute("autoplay", true)
    document.querySelector('.hero').appendChild(theme)
    game.init()
}