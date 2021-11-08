let game_status = '';


let Gameboard =  (() => {


    let cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    /**
     * initialize board
     */
    let init = () =>{
        //console.log(document);
        let index = 0;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.id = index;
            cell.style.gridArea = 'c'+(index+1);
            cell.style.width = '100%';
            cell.addEventListener('click', function (e){
                playRound(e);
            })
            cells[index] = cell;
            index++;
            //console.log(cell);
        });
    };

    /**
     * Draws shape X or O in given cell
     *
     * @param shape X or O
     * @param cell cell to place the shape at
     */
    let drawAt = (shape, cell) =>{
        let cell_element = cell;
        console.log(cell_element);
        console.log()
    }

    /**
     * Draws shape X or O in given cell
     *
     * @param shape X or O
     * @param i index
     */
    let drawAtIndex = (shape, i) =>{
        let cell_element = cells[i];
        console.log(cell_element);
    }

    return {cells, init, drawAt, drawAtIndex};
})();

/**
 * play a round of tic tac toe.
 * Note: a round = one player turn + one Ai turn (if no-one has won)
 *
 */
function playRound (e){
    let playerTurn;
    let shape;

    Gameboard.drawAt(shape, e.srcElement);

    if(game_status === 'running'){
        console.log("game is running");
    }
}

Gameboard.init();