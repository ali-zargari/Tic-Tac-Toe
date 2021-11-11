import {Tools} from "./tools.js";

let game_status = '';

/**
 * A Gameboard object to simulate a tic tac toe board
 *
 * @type {{init: init, cells: number[], drawAtIndex: drawAtIndex, getCellByID: (function(*): number), draw: draw, getCells: (function(): number[])}}
 */
const Gameboard =  (() => {

    let cells = [''*9]; // array of cells
    let grid = ''; //grid to fill with cells.

    /**
     * initialize board
     */
    const init = () =>{

        let index = 0;
        grid = document.getElementsByClassName('grid')[0];

        for(let i = 0; i <9; i++){
            cells[i]= new Cell(i, false);
            cells[i].placeInGrid(grid);
            let temp = Tools.addElement('div',"content", cells[i].getCellElement())
            Tools.addElement('i',"X fas fa-times", temp, undefined, '');
            Tools.addElement('i',"O far fa-circle", temp, undefined, 'O');

        }
    };

    /**
     * return the cell at index i
     *
     * @param i index
     * @returns Cell object
     */
    const getCellByID = (i) => {
        return cells[i];
    }

    /**
     * return the cell at index i
     *
     * @param i index
     * @returns Cell object
     */
    const getCells = () => {
        return cells;
    }

    /**
     * Draws X or O in given cell
     *
     * @param shape X or O
     * @param cell cell to place the shape at
     */
    const draw = (cell) =>{
        let cell_element = cell;

    }

    /**
     * Draws shape X or O in given cell
     *
     * @param shape X or O
     * @param i index
     */
    const drawAtIndex = (shape, i) =>{
        let cell_element = cells[i];

    }

    return {cells, getCellByID, init, draw, drawAtIndex, getCells};
})();

/**
 * Cell object to simulate the content in each cell of the tic tac toe board.
 */
function Cell (id, played) {

    let elem = '';
    this.id = id;
    this.played = played;



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
     * return the cells element.
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
    this.getId = function (){
        return id;
    }

    /*
     * function to make content disappear
     */
    this.disappear = function(e){

        let temp_shape = 'O';
        if(Controller.isPlayerTurn())
            temp_shape = 'X';

        window.animatelo.fadeOut(`.c${id} .content .${temp_shape}`);

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
     *
     * lock the current state of the cell by removing its listeners.
     *
     */
    this.lockState = function (e){

        elem.removeEventListener('mouseleave', this.disappear);
        elem.removeEventListener('mouseenter', this.appear);
        elem.removeEventListener('click', Controller.playRound);
        this.played = true;

    }

};


/**
 * Controller object to control the flow of the game. Makes use of Cell and Gameboard Objects.
 * @type {{playRound: playRound, startGame: startGame, isPlayerTurn: (function(): boolean)}}
 */
let Controller =  (() => {
    let player_turn = true;
    let selected_cell = 'NOT_SELECTED'

    /**
     * Return player_turn (true if it is the players turn, false otherwise).
     */
    const isPlayerTurn = () =>{
        return player_turn;
    }

    /**
     * TODO: more features later
     */
    const startGame = () => {
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
        player_turn = !player_turn;
        if(game_status === 'running'){
            console.log("game is running");
        }
        console.log(Gameboard.getCells());
    }


    function ai_decide_move(){

    }

    return {startGame, playRound, isPlayerTurn};
})();

Controller.startGame();
