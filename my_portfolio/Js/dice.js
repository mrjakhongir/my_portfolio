let score1 = 0;
let score2 = 0;
let player1Turn = true;

const message = document.getElementById("message")
const player1Score = document.getElementById("player1score")
const player2Score = document.getElementById("player2score")
const player1Dice = document.getElementById("player1dice")
const player2Dice = document.getElementById("player2dice")
const diceRoll = document.getElementById("roll-dice")
const resetGame = document.getElementById("reset-game")

diceRoll.addEventListener('click', renderGame)

function renderGame(){
    let randomNumber = Math.floor(Math.random()*6)+1

    if(player1Turn){
        score1 += randomNumber
        player1Score.textContent = score1 
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active") 
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        score2 += randomNumber
        player2Score.textContent = score2
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active") 
        message.textContent = "Player 1 Turn"
    }

    if (score1 >=20){
        message.textContent = "Player 1 Win!"
        diceRoll.style.display = "none"
        resetGame.style.display = "block"
    } else if(score2 >=20){
        message.textContent = "Player 2 Win!"
        diceRoll.style.display = "none"
        resetGame.style.display = "block"
    }

    player1Turn = !player1Turn
}

resetGame.addEventListener('click', resetFunc)

function resetFunc(){
    score1 = 0;
    score2 = 0;
    player1Turn = true;
    player1Score.textContent = 0;
    player2Score.textContent = 0;
    player2Dice.textContent = "-"
    player1Dice.textContent = "-"
    message.textContent = "Player 1 Turn"
    diceRoll.style.display = "block"
    resetGame.style.display = "none"
}