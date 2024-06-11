document.addEventListener('DOMContentLoaded', () => {
    const gameboard = document.querySelector('.gameboard');
    const cells = document.querySelectorAll('.cell');
    const player1 = { name: 'Player 1', symbol: 'X', color: 'rgb(83, 0, 0)' };
    const player2 = { name: 'Player 2', symbol: 'O', color: 'rgb(1, 22, 92)' };
    let currentPlayer = player1;

    const gameState = Array(9).fill(null);

    const modal = document.getElementById('game-over-modal');
    const modalMessage = document.getElementById('game-over-message');
    const resetButton = document.getElementById('reset-button');
    const closeModal = document.getElementById('close-modal');

    const player1Indicator = document.getElementById('player-1');
    const player2Indicator = document.getElementById('player-2');

    const checkWin = (symbol) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => gameState[index] === symbol)
        );
    };

    const handleGameOver = (message) => {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    };

    const handleClick = (e) => {
        const cell = e.target;
        const index = cell.dataset.index;

        if (gameState[index] === null) {
            gameState[index] = currentPlayer.symbol;
            cell.textContent = currentPlayer.symbol;
            cell.style.color = currentPlayer.color;
            cell.style.border = `10px solid ${currentPlayer.color}`;

            if (checkWin(currentPlayer.symbol)) {
                handleGameOver(`${currentPlayer.name} wins!`);
                return;
            } else if (gameState.every(cell => cell !== null)) {
                handleGameOver("It's a tie!");
                return;
            }

            currentPlayer = currentPlayer === player1 ? player2 : player1;
            updateActivePlayerIndicator();
        }
    };

    const updateActivePlayerIndicator = () => {
        if (currentPlayer === player1) {
            player1Indicator.classList.add('active');
            player2Indicator.classList.remove('active');
        } else {
            player2Indicator.classList.add('active');
            player1Indicator.classList.remove('active');
        }
    };

    const resetGame = () => {
        gameState.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = 'antiquewhite';
            cell.style.border = '1px solid antiquewhite';
        });
        currentPlayer = player1;
        updateActivePlayerIndicator();
        modal.style.display = 'none';
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
        cell.addEventListener('mouseover', (e) => {
            if (gameState[e.target.dataset.index] === null) {
                e.target.textContent = currentPlayer.symbol;
                e.target.style.color = currentPlayer.color;
                e.target.style.border = `10px solid ${currentPlayer.color}`;
            }
        });
        cell.addEventListener('mouseout', (e) => {
            if (gameState[e.target.dataset.index] === null) {
                e.target.textContent = '';
                e.target.style.color = 'antiquewhite';
                e.target.style.border = '1px solid antiquewhite';
            }
        });
    });
    resetButton.addEventListener('click', resetGame);
    closeModal.addEventListener('click', () => modal.style.display = 'none');

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    updateActivePlayerIndicator();
});
