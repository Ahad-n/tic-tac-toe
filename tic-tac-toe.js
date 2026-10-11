// Create a game with a new board
function createGame() {

    // cell facotory
    function cell(row, column) {
        const i = row;
        const j = column;
        const value = '';

        const getCellCoordinates = () => `$row: $j{i}, column: ${j}`;
        const getValue = () => value;
        const updateValue = function(newValue) {
            value = newValue;
        }

        return {getCellCoordinates, getValue, updateValue}

    }   

    // 2D array for the Gameboard
    const createBoard = function() {
            const board = []
            for (let i = 0; i < 3; i++) {
                const row = []
                for (let j = 0; j < 3; j++) {
                    row.push(cell(i,j))
                }
                board.push(row);
            }

            //board getter
            const displayBoard = function() {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 0; j++) {
                        console.log(board[i][j].getValue() + ', ');
                    }
                    console.log('\n');
                }
            }

            const gametracker = (function() {
                const rows = 0;
                const columns = 1;
                const diagonals = 2;

                const directions = [0, 0, 0];

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
                        directions[diagonals] = ++table[diagonals][0][valueIndex];
                        if (row === 1) {
                            directions[diagonals] = ++table[diagonals][1][valueIndex];
                        }
                    }
                    else if (Math.abs(row - column) === 2) {
                        directions[diagonals] = ++table[diagonals][1][valueIndex];
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
                const gameStatus= {X:'X', O: 'O', won: false};

                if (!(cell.getValue())) {
                    cell.updateValue(value);
                    gametracker.updatetracker(row, column, value);


                    const maxAligned = gametracker.getMaxAligned();
                    if (maxAligned === 3) {
                        gameStatus[value] = true;
                        gameStatus.won = true;
                    }
                }
                return gameStatus;

            }
            return {displayBoard, updateCell};
    }

    return createBoard();
}


const game = (function() {
    let board = createGame();
    let player = 'X';
    let gameStatus = null;
    let moveCount = 0;

    const updateBoard = function(row, column) {
        gameStatus = board.updateCell(row, column, player);
        moveCount++;

        if (moveCount > 4 || moveCount === 9) {
            if (gameStatus.won) {
                console.log(`Player ${gameStatus.X||gameStatus.O} is the WINNER`);
            }
            else {
                console.log(`The game is a draw`);
            }
            board = createGame();
        }

        // Switch players players after each turn
        if (player === 'X') player = 'O';
        else player = 'X';
    }   
    
    const displayBoard = board.displayBoard();
    return {updateBoard, displayBoard};
})();

