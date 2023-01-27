let xScore = 0;
let oScore = 0;
let unentschieden = 0;

const playerXScore = document.querySelector("#player-x-score");
const playerOScore = document.querySelector("#player-o-score");
const unentschiedenElement = document.querySelector("#draw-score");

function updateScore() {
  playerXScore.textContent = "X: " + xScore;
  playerOScore.textContent = "O: " + oScore;
  unentschiedenElement.textContent = "Unentschieden: " + unentschieden;
}
let aktuellerSpieler = "X";
let moves = 0;
const cells = document.querySelectorAll("td");
let gameOver = false;

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() {
    if (this.textContent === "" && !gameOver) {
        this.textContent = aktuellerSpieler;
        moves++;
        if (checkForWinner()) {
            gameOver = true;
            return;
        }
        if (moves === 9) {
            const GewinnerAusgabe = document.querySelector("#winner-message");
            GewinnerAusgabe.textContent = "It's a tie!";
            GewinnerAusgabe.style.display = "block";
            unentschieden++;
            updateScore();
            const resetButton = document.querySelector("#reset-button");
            resetButton.addEventListener("click", resetGame);
            return;
        }
        aktuellerSpieler = aktuellerSpieler === "X"? "O" : "X";
    }
    });
    }
    
    function checkForWinner() {
    const gewinnerErkennung = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];
    for (let i = 0; i < gewinnerErkennung.length; i++) {
        const [a, b, c] = gewinnerErkennung[i];
        if (
          cells[a].textContent === aktuellerSpieler &&
          cells[b].textContent === aktuellerSpieler &&
          cells[c].textContent === aktuellerSpieler
        ) {
          const GewinnerAusgabe = document.querySelector("#winner-message");
          GewinnerAusgabe.textContent = `Player ${aktuellerSpieler} wins!`;
          GewinnerAusgabe.style.display = "block";
          if (aktuellerSpieler === "X") {
              xScore++;
            } else if (aktuellerSpieler === "O") {
              oScore++;
            }
            updateScore();
          const resetButton = document.querySelector("#reset-button");
          resetButton.addEventListener("click", resetGame);
      
          return true;
        }
      }
      return false;
    }

      function resetGame() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = "";
    }
    moves = 0;
    aktuellerSpieler = "X";
    gameOver = false;
    const GewinnerAusgabe = document.querySelector("#winner-message");
    GewinnerAusgabe.style.display = "none";
    updateScore();
  }

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetGame);
