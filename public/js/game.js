const startButton = $('#game-start-button')
const gameSquare = $('#red-square')
const submitButton = $('#submit-button')
const scoreEl = $('#score')

let gameStarted = false;
let canClickSquare = false;
let fault = false
let startTime
let clickTime
let score


function startGame() {
    //time range that the square can turn green is between 2 and 8 seconds
    startButton.hide()
    const randomDelay = (Math.floor(Math.random() * 6000)) + 2000
    gameStarted = true;
    setTimeout(() => {

        canClickSquare = true
        gameSquare.css('background-color', 'green')

        startTime = Date.now()
        console.log(startTime)
    }, randomDelay)

}

function squareClick() {

    if (gameStarted) {
        if (canClickSquare && !fault) {

            gameStarted = false;
            clickTime = Date.now()
            console.log(clickTime)

            score = clickTime - startTime

            console.log("Your score: " + score)

            scoreEl.text(score)
        } else {
            fault = true
            console.log("Fault!")
            scoreEl.text("You clicked too early!")
        }
    }






}

function submitScore() {
    if (!fault) {
        if (score) {
            $.post('/api/score/', { score: score }, (response) => {
                document.location.replace('/leaderboard')
            })
                .fail((response) => {
                    console.log(response)
                })
        }
    } else {
        document.location.reload()
    }
}


gameSquare.on('mousedown', squareClick)
startButton.on('click', startGame)
submitButton.on('click', submitScore)
