/** Connect Four Game
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7; // Treated as the x axis 
const HEIGHT = 6; // Treated as the y axis 
const restartGame = document.getElementById("restart-game-button");

let currPlayer = 1; // active player set at 1 to start 
let board = []; // array of rows, each row is an array containing cells (board[y][x])

restartGame.addEventListener("click", function () {
    currPlayer = 1;

    const htmlBoard = document.getElementById('board');
    htmlBoard.innerHTML = "";
    makeHtmlBoard();

    board = [];
    makeBoard();

    updateHover();
});

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
    // ✓TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let y = 0; y < HEIGHT; y++) {
        // Initialize an empty array with said length 
        let widthArray = Array.from({ length: WIDTH });
        // Push the widthArray into the board empty array
        board.push(widthArray);
    }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
    // ✓TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.getElementById('board');

    // ✓TODO: add comment for this code
    // Creating a table row (comlumn top) to "drop" a game piece 
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);

    // Creates the indivual "cell" for comlumn top 
    for (let x = 0; x < WIDTH; x++) {
        const headCell = document.createElement("td");
        // Assigning an id to each cell(table data)
        headCell.setAttribute("id", x);
        top.append(headCell);
    }
    // Appending the column top to the htmlBoard 
    htmlBoard.append(top);

    // ✓TODO: add comment for this code
    // Creating the rest of the game board with dimension of specified height and width 
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            // Assingning the id to each cell with respective coordinates
            cell.setAttribute("id", `${y}-${x}`);
            // const id = y + "-" + x;
            // cell.setAttribute("id", id);
            row.append(cell);
        }
        htmlBoard.append(row);
    }
}

function updateHover() {
    const columnTop = document.getElementById('column-top');
    // columnTop.className = `hover-p${currPlayer}`;
    columnTop.className = "hover-p" + currPlayer;
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
    // ✓TODO: write the real version of this, rather than always returning 0
    for (let y = HEIGHT - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
    // ✓TODO: make a div and insert into correct table cell
    const piece = document.createElement('div');
    piece.classList.add('piece');
    //piece.classList.add(`p1`) OR piece.classList.add(`p2`)
    //so to style the pieces, need to refer to p1 and p2 in CSS 
    piece.classList.add(`p${currPlayer}`);
    piece.style.top = -50 * (y + 2); // CSS Styling

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
}

/** endGame: announce game end */
function endGame(msg) {
    // ✓TODO: pop up alert message
    alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
    // get x from ID of clicked cell
    // "+" turns the string of the id into a number id 
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);
    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table
    // ✓TODO: add line to update in-memory board
    board[y][x] = currPlayer; // This update the array, backend.
    placeInTable(y, x); //This places the circle on the HTML side, frontend.

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // ✓TODO: check if all cells in board are filled; if so call, call endGame
    if (board.every(row => row.every(cell => cell))) {
        return endGame('Tie!');
    }

    // let isAllFull = board.every(function (row) {
    //     row.every(function (cell) {
    //         return cell;
    //     })
    // });
    // console.log("isAllFull ", isAllFull);
    // if (isAllFull === true) {
    //     return endGame("Tie!");
    // }

    // switch players
    // ✓TODO: switch currPlayer 1 <-> 2
    currPlayer = currPlayer === 1 ? 2 : 1;
    updateHover();
    // currPlayer = ((currPlayer === 1) ? 2 : 1);

    // if (currPlayer === 1) {
    //     currPlayer = 2;
    // } else {
    //     currPlayer = 1;
    // }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }

    // return cells.every(function (element) {
    //     const isYBiggerThan0 = (element[0] >= 0);
    //     const isYSmallerThanHeight = (element[0] < HEIGHT);
    //     const isXBiggerThan0 = (element[1] >= 0);
    //     const isXSmallerThanWidth = (element[1] < WIDTH);
    //     const isValueOnBoardSameAsCurrentPlayer = (board[element[0], element[1]] === currPlayer);

    //     if (isYBiggerThan0 === true && isYSmallerThanHeight === true && isXBiggerThan0 === true && isXSmallerThanWidth === true && isValueOnBoardSameAsCurrentPlayer === true) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // });

    // return cells.every(function ([y, x]) {
    //     // console.log("_win", actualCell);
    //     console.log("_win - every - y,x = ", y, x);
    //     return true;
    // });


    // ✓TODO: read and understand this code. Add comments to help you.
    for (let y = 0; y < HEIGHT; y++) {
        // console.log("checkForWin y", y);
        for (let x = 0; x < WIDTH; x++) {
            // console.log("checkForWin x", x);
            // listing out the different ways you can win the game 
            const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

            // checking if the player won by one of the four possibilities listed above
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

makeBoard();
makeHtmlBoard();
updateHover();
