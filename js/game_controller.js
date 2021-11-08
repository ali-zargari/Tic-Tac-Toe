

let game_status = '';


let Gameboard =  (() => {

    let cells = [''*9];

    /**
     * initialize board
     */
    let init = () =>{
        //console.log(document);
        let index = 0;

        document.querySelectorAll('.cell').forEach(cell => {
            cell.id = index+'';
            cell.style.gridArea = 'c'+(index);
            cell.style.width = '100%';
            window.animatelo.fadeOut(`.c${cell.id} .content`);
            cell.addEventListener('click', playRound)
            cell.addEventListener('mouseenter', appear)
            cell.addEventListener('mouseleave', disappear)
            cells[index] = cell;
            index++;
        });
    };

    function disappear(e){
        console.log(e.currentTarget);
        window.animatelo.fadeOut(`.c${e.currentTarget.id} .content`);

    }

    function appear (e){
        console.log(e.currentTarget);
        window.animatelo.fadeIn(`.c${e.currentTarget.id} .content`);
    }

    /**
     * Draws shape X or O in given cell
     *
     * @param shape X or O
     * @param cell cell to place the shape at
     */
    let drawAt = (shape, cell) =>{
        let cell_element = cell;

        console.log(cell.removeEventListener('click', playRound));
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

    Gameboard.drawAt(shape, e.srcElement.parentNode);

    if(game_status === 'running'){
        console.log("game is running");
    }
}

Gameboard.init();