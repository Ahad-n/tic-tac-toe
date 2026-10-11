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
                    console.log('/n');
                }
            }

            const gametracker = (function() {
                const rows = 0;
                const columns = 1;
                const diagonals = 2;

                const table = [];
                for (let i = 0; i < 3; i++) {
                    const direction = [];
                    for (let j = 0; j < 3; j++) {
                        direction.push([0, 0]);
                    }
                    table.push(direction);
                }

                const updatetracker = function(row, column, value) {
                    const valueIndex = 0;
                    if (value === 'O') {
                        valueIndex = 1;
                    }

                    if (row === column) {
                        table[diagonals][0][valueIndex]++;
                        if (row === 1) {
                            table[diagonals][1][valueIndex]++;
                        }
                    }
                    else if (Math.abs(row - column) === 2) {
                        table[diagonals][1][valueIndex]++;
                    }

                    table[rows][row][valueIndex];
                    table[columns][column][valueIndex];
                }

                
                return {updatetracker};

            })();


            // method for updating cells
            const updateCellByX = function(row, column) {
                const value = 'X';
                board[row][column].updateValue(value);
                gametracker.updatetracker(row, column, value);
            }
            const updateCellByO = function(row, column) {
                board[row][column].updateValue('O');
                gametracker.updatetracker(row, column, value);
            }
            
            return {displayBoard, updateCellByX, updateCellByO};
    }

    return createBoard();
}



// Play game
    // play turn
    // reset game

