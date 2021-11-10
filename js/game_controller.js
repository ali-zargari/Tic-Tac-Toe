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
        //console.log(grid);
        for(let i = 0; i <9; i++){
            cells[i]= new Cell(i);
            cells[i].placeInGrid(grid);
            let temp = Tools.addElement('div',"content", cells[i].getCellElement())
            Tools.addElement('i',"X fas fa-times", temp, undefined, 'X');
            Tools.addElement('i',"O fas fa-circle", temp, undefined, 'O');



            //console.log(cells[i].getContent());

        }
    };

    /**
     * return the cell at index i
     *
     * @param i index
     * @returns Cell object
     */
    let getCellByID = (i) => {
        return cells[i];
    }

    /**
     * Draws X or O in given cell
     *
     * @param shape X or O
     * @param cell cell to place the shape at
     */
    let draw = (cell) =>{
        let cell_element = cell;

        //console.log(cell);
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

    return {cells, getCellByID, init, draw, drawAtIndex};
})();

/**
 * Cell object to simulate the content in each cell of the tic tac toe board.
 */
function Cell (id) {

    let elem = '';
    this.id = id;
    let played = false;



    /**
     * Add all needed event listeners to this cell.
     *
     *
     */
    this.addELS = function(){
        elem.addEventListener('click', Controller.playRound);
        elem.addEventListener('mouseenter', this.appear);
        elem.addEventListener('mouseleave', this.disappear);
    }




    /**
     * places the cell in the passed grid. Function has to be called for other functions to work.
     *
     * @param grd grid to place the cell element in.
     */
    this.placeInGrid = function(grd){
        elem = Tools.addElement('div', `cell c${id}`, grd, id);
        elem.style.gridArea = 'c'+(id);
        elem.style.width = '100%';
        this.addELS();
    }

    /**
     *
     * @returns cell's element.
     *
     */
    this.getCellElement = function(){
        return elem;
    }

    /**
     *
     * @returns cell's content element. AKA, it's child
     */
    this.getContent = function (){
        return elem.querySelector('.content');
    }

    /*
     * function to make content disappear
     */
    this.disappear = function(e){
        //console.log(e.currentTarget);
        window.animatelo.fadeOut(`.c${e.currentTarget.id} .content .X`);

    }

    /*
     * function to make content reappear
     */
    this.appear = function (){
        let temp_shape = 'O';
        if(Controller.isPlayerTurn())
            temp_shape = 'X';

        window.animatelo.fadeIn(`.c${id} .content .${temp_shape}`);
    }


    /**
     * lock the current state of the cell by removing the listeners.
     *
     *
     */
    this.lockState = function (e){
        console.log(this);
        elem.removeEventListener('mouseleave', this.disappear);
        elem.removeEventListener('mouseenter', this.appear);
        elem.removeEventListener('click', this.lockState);
        played = true;
    }

};



let Controller =  (() => {
    let player_turn = true;
    let selected_cell = 'NOT_SELECTED'

    let isPlayerTurn = () =>{
        return player_turn;
    }

    /**
     * TODO: more features later
     */
    let startGame = () => {
        Gameboard.init();
    }

    /**
     * play a round of tic tac toe.
     * Note: a round = one player turn + one Ai turn (if no-one has won)
     *
     */
    function playRound (e){

        let played_cell = Gameboard.getCellByID(e.srcElement.parentNode.parentNode.id);
        //console.log(played_cell.id)
        played_cell.lockState(e);
        if(game_status === 'running'){
            console.log("game is running");
        }
    }

    return {startGame, playRound, isPlayerTurn};
})();

Controller.startGame();