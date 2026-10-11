// Create a game with a new board
function createGame() {

    // cell facotory
    function cell(row, column) {
        const i = row;
        const j = column;
        let value = '';

        const getCellCoordinates = () => `$row: $j{i}, column: ${j}`;
        const getValue = () => value;
        const updateValue = function(newValue) {
            value = newValue;
        }

        return {getCellCoordinates, getValue, updateValue}

    }   

    // 2D array for the Gameboard
    const createBoard = function() {
        let board = [];

            const setBoard = function() {
                const newBoard = [];
                for (let i = 0; i < 3; i++) {
                    const row = []
                    for (let j = 0; j < 3; j++) {
                        row.push(cell(i,j))
                    }
                    newBoard.push(row);
                }

                board = newBoard;
            }

            setBoard();

            //board getter
            const viewer  = document.createElement('div');
            viewer.classList.add('viewer');
            const ticTacToe = document.querySelector('.ticTacToe');
            ticTacToe.appendChild(viewer);

            const displayBoard = function() {
                // clear previous data
                viewer.textContent = '';

                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        // const cell = board[i][j];
                        const cell = document.createElement('div');
                        const sign = document.createElement('div');
                        cell.classList.add('cell');
                        sign.textContent = board[i][j].getValue();

                        cell.dataset.row = i;
                        cell.dataset.column = j;

                        cell.appendChild(sign);
                        viewer.appendChild(cell);
                    }
                }
            }

            const gametracker = (function() {
                const rows = 0;
                const columns = 1;
                const diagonals = 2;
                const mainDiagonal = 2;
                const secondDiagonal = 3;

                const directions = [0, 0, 0, 0];

                const table = [];
                for (let i = 0; i < 3; i++) {
                    const direction = [];
                    for (let j = 0; j < 3; j++) {
                        direction.push([0, 0]);
                    }
                    table.push(direction);
                }

                const updatetracker = function(row, column, value) {
                    let valueIndex = 0;
                    if (value === 'O') {
                        valueIndex = 1;
                    }

                    if (row === column) {
                        directions[mainDiagonal] = ++table[diagonals][0][valueIndex];
                        if (row === '1') {
                            directions[secondDiagonal] = ++table[diagonals][1][valueIndex];
                        }
                    }
                    else if (Math.abs(Number(row) - Number(column)) === 2) {
                        directions[secondDiagonal] = ++table[diagonals][1][valueIndex];
                    }

                    directions[rows] = ++table[rows][row][valueIndex];
                    directions[columns] = ++table[columns][column][valueIndex];
                }

                const getMaxAligned = () => directions.reduce((max, value) => {
                    return (max > value) ? max : value;
                });

                return {updatetracker, getMaxAligned};})();


            // method for updating cells
            const updateCell= function(row, column, value) {
                const cell = board[row][column];
                let gameStatus= {X:false, O: false, won: false};

                if (!(cell.getValue())) {
                    cell.updateValue(value);
                    gametracker.updatetracker(row, column, value);


                    const maxAligned = gametracker.getMaxAligned();
                    if (maxAligned === 3) {
                        gameStatus[value] = true;
                        gameStatus.won = true;
                    }
                }
                else gameStatus = null;
                return gameStatus;

            }

            const clearBoard = () => setBoard();
            return {displayBoard, updateCell, clearBoard};
    }

    return createBoard();
}


const playGame = function(player1, player2) {
    let board = createGame();
    let playerTurn = 'X';
    let gameStatus = null;
    let moveCount = 0;

    // create a function that resets the game when it is over
    function endGame(gameStatus) {

        // create an element that announces the winner and draw games
        const finishingStatus = document.createElement('div');
        const ticTacToe = document.querySelector('.ticTacToe');
        let message = '';

        if (gameStatus.won) {
            const winner = gameStatus.X ? player1.name : player2.name;
            message = `${winner} WON the game!!!`
        }
        else message = 'Game is a draw';

        finishingStatus.textContent = message;
        ticTacToe.appendChild(finishingStatus);

        //reset the game
        board = createGame();
        board.displayBoard();
        moveCount = 0;
        
    }

    board.displayBoard();
    const updateBoard = function(row, column) {
        gameStatus = board.updateCell(row, column, playerTurn);
        displayBoard();
        
        if(gameStatus){
            // Switch players players after each turn
            playerTurn = (playerTurn === player1) ? player2.value : player2.value;
            moveCount++;
        }

        if (moveCount > 4) {
            if (gameStatus.won || moveCount === 9) {
                endGame(gameStatus);
            }
        }
        
    }   
    
    const displayBoard = board.displayBoard;
    return {updateBoard, displayBoard};
}


// clean up and allowing palyers to put their names.
function startGame() {
    // create variables to collect player names with default values
    const p1 = {name: 'X', value: 'X'};
    const p2 = {name: 'O', value: 'O'};

    // create a dialog with a form
    const dialog = document.createElement('dialog');
    const form = document.createElement('form');
    
    const player1 = document.createElement('div');
    const  input1 = document.createElement('input');
    input1.setAttribute('type', 'text');
    input1.setAttribute('id', 'player1');
    const label1 = document.createElement('label');
    label1.setAttribute('for', 'player1');
    label1.textContent = "Player2: ";
    player1.append(label1, input1);

    const player2 = document.createElement('div');
    const  input2 = document.createElement('input');
    input2.setAttribute('type', 'text');
    input2.setAttribute('id', 'player2');
    const label2 = document.createElement('label');
    label2.setAttribute('for', 'player2');
    label2.textContent = "Player2: ";
    player2.append(label2, input2);
    
    const submit = document.createElement('button');
    submit.classList.add('submit-btn');
    submit.setAttribute('formmethod', 'dialog');
    
    form.append(player1, player2, submit);
    dialog.appendChild(form);
    
    // collect the data from the dialog
    submit.addEventListener('click', (event) => {
        event.preventDefault();
        if (player1) p1.name = player1;
        if (player2) p2.name = player2;
        
        game = playGame(p1, p2);

        // todo: call playgame using a variable game
        // integrate with DOM interactions
        // add event listener for the viewer
        const viewer = document.querySelector('.viewer')
        viewer.addEventListener('click', (event) => {
            const cell = event.target;
            if (cell.matches('.cell')) {
                const row = cell.dataset.row;
                const column = cell.dataset.column;
        
                game.updateBoard(row, column);
            }
        });
    });
}

startGame();