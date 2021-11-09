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
            Tools.addElement('i',"X fas fa-times", temp, undefined, 'X');
            Tools.addElement('i',"O fas fa-circle", temp, undefined, 'O');

            cells[i].getContent().style.opacity = '0%';
            cells[i].addELS();

            //console.log(cells[i].getContent());

        }
    };


    /**
     * Draws shape X or O in given cell
     *
     * @param shape X or O
     * @param cell cell to place the shape at
     */
    let draw = (cell) =>{
        let cell_element = cell;

        console.log(cell);
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

    return {cells, init, draw, drawAtIndex};
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
        elem.style.gridArea = 'c'+(id);
        elem.style.width = '100%';
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

    /*
     * function to make content disappear
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
     * Add all needed event listeners to this cell.
     *
     *
     */
    Cell.prototype.addELS = function(){
        elem.addEventListener('click', lockState);
        elem.addEventListener('mouseenter', appear);
        elem.addEventListener('mouseleave', disappear);
    }

    /**
     * lock the current state of the cell by removing the listeners.
     *
     *
     */
    function lockState (e){
        elem.removeEventListener('mouseleave', disappear);
        elem.removeEventListener('mouseenter', appear);
        elem.removeEventListener('click', lockState);

    }

};

/**
 * play a round of tic tac toe.
 * Note: a round = one player turn + one Ai turn (if no-one has won)
 *
 */
function playRound (e){
    let playerTurn;
    //console.log(e.srcElement);
    //Gameboard.lockState(e.srcElement);

    if(game_status === 'running'){
        console.log("game is running");
    }
}

Gameboard.init();