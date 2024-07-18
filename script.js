const gameBoard = document.querySelector('#game-board');
const boxes = document.querySelectorAll('.box');
let move = 1;
const form = document.querySelector('form');
const modal = document.querySelector('#modal');
const resultModal = document.querySelector('#result-modal');
let player1Name = document.querySelector('input#player1-name');
let player2Name = document.querySelector('input#player2-name');
const submitButton = document.querySelector('button#start-game');
const resultMessage = document.querySelector('#result-message');
const playAgainButton = document.querySelector('#play-again');

const gameBoardArray = ["", "", "", "", "", "", "", "", ""];

let player1, player2;

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        let id = Number(box.id);
        if (box.textContent == "") {
            if (move % 2 == 1) {
                box.innerHTML = "<h1>X</h1>";
                gameBoardArray[id] = "X";
            } else {
                box.innerHTML = "<h1>O</h1>";
                gameBoardArray[id] = "O";
            }
            move++;
            checkWinner();
        } else {
            alert('Please do not select a box that has already been selected');
        }
    });
});

class Player {
    constructor(name) {
        this.name = name;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoardArray[a] && gameBoardArray[a] === gameBoardArray[b] && gameBoardArray[a] === gameBoardArray[c]) {
            setTimeout(() => {
                resultMessage.textContent = `Player ${gameBoardArray[a]} (${gameBoardArray[a] === "X" ? player1.name : player2.name}) wins!`;
                resultModal.style.display = "flex";
            }, 100);
            return;
        }
    }

    if (!gameBoardArray.includes("")) {
        setTimeout(() => {
            resultMessage.textContent = 'It\'s a tie!';
            resultModal.style.display = "flex";
        }, 100);
    }
}

function resetGame() {
    gameBoardArray.fill("");
    boxes.forEach(box => box.innerHTML = "");
    move = 1;
    modal.style.display = "flex";
    gameBoard.style.display = "none";
    form.reset();
}

submitButton.addEventListener('click', () => {
    player1 = new Player(player1Name.value);
    player2 = new Player(player2Name.value);
    modal.style.display = "none";
    gameBoard.style.display = "grid";
});

playAgainButton.addEventListener('click', () => {
    resultModal.style.display = "none";
    resetGame();
});

// Show the modal at the start
modal.style.display = "flex";
