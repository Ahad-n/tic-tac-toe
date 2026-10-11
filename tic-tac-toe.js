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

            // method for updating cells
            const updateCellByX = function(row, column) {
                board[row][column].updateValue('X');
            }
            const updateCellByO = function(row, column) {
                board[row][column].updateValue('O');
            }
            
            return {displayBoard, updateCellByX, updateCellByO};
    }

    return createBoard();
}

// Play game
    // play turn
    // reset game