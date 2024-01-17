document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("ticTacToeBoard");
    const resultDisplay = document.getElementById("result");
    const restartBtn = document.getElementById("restartBtn");
    const opponentSelect = document.getElementById("opponentSelect");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    let currentOpponent = "ai";

    // Add cells to the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    opponentSelect.addEventListener("change", function () {
        currentOpponent = opponentSelect.value;
        restartGame(); // Restart the game when the opponent changes
    });

    function handleCellClick(event) {
        if (!gameActive) return;

        const index = event.target.dataset.index;
        if (gameBoard[index] === "") {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;

            if (checkGameResult()) {
                resultDisplay.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            } else if (gameBoard.every(cell => cell !== "")) {
                resultDisplay.textContent = "It's a draw!";
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (currentOpponent === "ai" && currentPlayer === "O") {
                    setTimeout(makeAIMove, 500); // AI move after a short delay
                }
            }
        }
    }

    function makeAIMove() {
        if (!gameActive) return;

        const emptyCells = gameBoard.reduce((acc, cell, index) => {
            if (cell === "") {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiMove = emptyCells[randomIndex];

        gameBoard[aiMove] = currentPlayer;
        document.querySelector(`[data-index="${aiMove}"]`).textContent = currentPlayer;

        if (checkGameResult()) {
            resultDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== "")) {
            resultDisplay.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkGameResult() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    // Function to restart the game
    window.restartGame = function () {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        resultDisplay.textContent = "";
        document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
        });

        if (currentOpponent === "ai" && currentPlayer === "O") {
            setTimeout(makeAIMove, 500); // AI move after a short delay
        }
    };
});
