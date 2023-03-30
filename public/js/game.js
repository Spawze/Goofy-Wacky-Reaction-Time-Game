//initialize all interactive dom elements
const startButton = $('#game-start-button')
const gameSquare = $('#red-square')
const submitButton = $('#submit-button')
const resetButton = $('#reset-button')
const scoreEl = $('#score')
const getReadyText = $('#get-ready')
//initialize all game logic variables
let gameStarted = false;
let canClickSquare = false;
let fault = false
let tooLate = false
let startTime
let clickTime
let score

function startGame() {
    
    startButton.hide()
    getReadyText.show()
    //time range that the square can turn green is between 2 and 8 seconds
    const randomDelay = (Math.floor(Math.random() * 6000)) + 2000
    gameStarted = true;
    setTimeout(() => {
        canClickSquare = true
        gameSquare.css('background-color', 'green')
        getReadyText.text("Click!")
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
            if (score > 1000) {
                tooLate = true
                scoreEl.text("Too late!")
            } else if(score < 100){
                fault = true
                scoreEl.text("Impossible score! You guessed!")
            }else {
                console.log("Your score: " + score)

                scoreEl.text(score)
            }
        } else {
            fault = true
            scoreEl.text("You clicked too early!")
        }
    }
}

function submitScore() {
    if (!fault && !tooLate) {
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

function resetGame(){
    document.location.reload()
}

//initialize event listeners
gameSquare.on('mousedown', squareClick)
startButton.on('click', startGame)
submitButton.on('click', submitScore)
resetButton.on('click', resetGame)