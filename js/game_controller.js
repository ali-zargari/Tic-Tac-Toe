import {Tools} from "./tools.js";

let game_status = '';

/**
 * A Gameboard object to simulate a tic tac toe board
 *
 * @type {{init: init, cells: number[], drawAtIndex: drawAtIndex, drawAt: drawAt}}
 */
let Gameboard =  (() => {

    let cells = [''*9];
    let grid = '';

    /**
     * initialize board
     */
    let init = () =>{
        //console.log(document);
        let index = 0;
        grid = document.getElementsByClassName('grid')[0];
        console.log(grid);
        for(let i = 0; i <9; i++){
            cells[i]= new Cell(i);
            cells[i].placeInGrid(grid);
            let temp = Tools.addElement('div',"content", cells[i].getCellElement())
            Tools.addElement('i',"X fas fa-times", temp);
            Tools.addElement('i',"O fas fa-times", temp);
            cells[i].getCellElement().style.gridArea = 'c'+(i);
            cells[i].getCellElement().style.width = '100%';
            cells[i].getContent().style.opacity = '0%';
            cells[i].getCellElement().addEventListener('click', playRound)
            cells[i].getCellElement().addEventListener('mouseenter', appear)
            cells[i].getCellElement().addEventListener('mouseleave', disappear)

            //console.log(cells[i].getContent());

        }

        /**
         *
         *
        document.querySelectorAll('.cell').forEach(cell => {

            window.animatelo.fadeOut(`.c${cell.id} .content`);
            cell.addEventListener('click', playRound)
            cell.addEventListener('mouseenter', appear)
            cell.addEventListener('mouseleave', disappear)
            cells[index] = cell;
            index++;
        });
         */
    };

    /*
     * function to help content disappear
     */
    function disappear(e){
        //console.log(e.currentTarget);
        window.animatelo.fadeOut(`.c${e.currentTarget.id} .content`);

    }

    /*
     * function to make content reappear
     */
    function appear (e){
        //console.log(e.currentTarget);
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
        //console.log(cell.removeEventListener('click', playRound));
    }

    /**
     * Draws shape X or O in given cell
     *
     * @param shape X or O
     * @param i index
     */
    let drawAtIndex = (shape, i) =>{
        let cell_element = cells[i];
        //console.log(cell_element);
    }

    return {cells, init, drawAt, drawAtIndex};
})();

/**
 * Cell object to simulate the content in each cell of the tic tac toe board.
 */
function Cell (id) {

    let elem = '';
    this.id = id;

    /**
     * places the cell in the passed grid. Function has to be called for other functions to work.
     *
     * @param grd grid to place the cell element in.
     */
    Cell.prototype.placeInGrid = function(grd){
        elem = Tools.addElement('div', `cell c${id}`, grd, id);
    }

    /**
     *
     * @returns cell's element.
     */
    Cell.prototype.getCellElement = function(){
        return elem;
    }

    /**
     *
     * @returns cell's content element. AKA, it's child
     */
    Cell.prototype.getContent = function (){
        return elem.querySelector('.content');
    }
};

/**
 * play a round of tic tac toe.
 * Note: a round = one player turn + one Ai turn (if no-one has won)
 *
 */
function playRound (e){
    let playerTurn;
    let shape;

    //Gameboard.drawAt(shape, e.srcElement.parentNode);

    if(game_status === 'running'){
        console.log("game is running");
    }
}

Gameboard.init();