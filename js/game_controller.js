import {Tools} from "./tools.js";

/**
 * A Gameboard object to simulate a tic tac toe board
 *
 * @type {{init: init, cells: number[], drawAtIndex: drawAtIndex, getCellByID: (function(*): number), draw: draw, getCells: (function(): number[])}}
 */
const Gameboard =  (() => {

    let player_shape = '';
    let player_name = 'player 1'
    let opponent_shape = '';
    let opponent_name = 'opponent'
    let cells = []; // array of cells
    let grid = ''; //grid to fill with cells.

    /**
     * helper  method to initialize the cells in the grid.
     */
    const setCells = () => {
        grid = document.querySelector('.grid');
        //console.log("test: " + grid.children);
        grid.querySelectorAll('.cell').forEach(e => e.remove())
        //console.log("after removal" + grid.children);

        for(let i = 0; i <9; i++){

            //console.log(grid.children.item(i));
            cells[i]= new Cell(i, false);
            cells[i].placeInGrid(grid);
            let temp = Tools.addElement('div',"content", cells[i].getCellElement())
            Tools.addElement('i',"X fas fa-times", temp, undefined, 'X');
            Tools.addElement('i',"O far fa-circle", temp, undefined, 'O');

        }
    }

    /**
     * helper method to reset the cells in the grid
     */
    const reset = () => {

        GameController.restartAIboard();
        if(player_shape === '') return;

        cells.forEach(c => {
            c.resetCell();
        })

        setCells();

    }

    /**
     * initialize board
     */
    const init = () =>{


        setCells();

        /**
         * initialize info panel
         */

        let temp = document.getElementsByClassName('reset');

        temp.item(0).addEventListener('click', function (e){
            GameController.restartAIboard();
            reset();
        })

        document.querySelectorAll('.itext').forEach(inp => {
           inp.addEventListener('input', function (e){

               let temp_name = e.target.value;

               if(e.target.className === 'itext P1'){
                   player_name = temp_name;
                   document.querySelector('.p_name').innerHTML = player_name;
               } else {
                   opponent_name = temp_name;
                   document.querySelector('.o_name').innerHTML = opponent_name;
               }

           })
        });

        /***
         * Set up the shape choice buttons
         * @type {NodeListOf<Element>}
         */
        temp = document.querySelectorAll('.choice');
        temp.forEach(e => {
           e.addEventListener('click',function (e){
               let temp = e.currentTarget;
               reset();

               GameController.setPlayerTurn(true);

               //activate board
               cells.forEach(c =>{
                   c.addELS();
               })

               //change the button that's pressed
               temp.style.backgroundImage = '-webkit-linear-gradient(top, #3cb0fd, #3498db)';
               player_shape = temp.classList[1];
               console.log(player_shape);


               //change color of the other button
               if(temp.nextElementSibling == null){
                   temp.parentElement.firstElementChild.style.backgroundImage = '-webkit-linear-gradient(top, #3498db, #2980b9)';
                   opponent_shape = temp.parentElement.firstElementChild.classList[1];

               } else{

                   temp.nextElementSibling.style.backgroundImage = '-webkit-linear-gradient(top, #3498db, #2980b9)';
                   opponent_shape = temp.nextElementSibling.classList[1];
               }

           })
        });
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
     */
    const getCells = () => {
        return cells;
    }

    /**
     * return the player 1 shape
     *
     */
    const getPlayerShape = () => {
        return player_shape;
    }

    /**
     * return the player 1 shape
     *
     */
    const getOpponentShape = () => {
        return opponent_shape;
    }

    /**
     * Draws X or O in given cell
     *
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

    return {cells, getCellByID, getPlayerShape, getOpponentShape, init, draw, drawAtIndex, getCells};
})();

/**
 * Cell object to simulate the content in each cell of the tic tac toe board.
 */
function Cell (id, played) {

    let elem = '';
    this.id = id;
    this.played = played;
    let current_shape = '-';

    this.getShape = function (){
        return current_shape;
    }

    /**
     * Add all needed event listeners to this cell.
     *
     *
     */
    this.addELS = function(){
        elem.addEventListener('click', GameController.playRound);
        elem.addEventListener('mouseenter', this.appear);
        elem.addEventListener('mouseleave', this.disappear);
    }


    this.resetCell = function(){
        this.disappear(true)
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
    this.disappear = function(all){

        let temp_shape = Gameboard.getOpponentShape().toUpperCase();
        //let temp_shape = 'X';
        if(GameController.isPlayerTurn()) {
            temp_shape = Gameboard.getPlayerShape().toUpperCase();
            //let temp_shape = 'O';
        }

        window.animatelo.fadeOut(`.c${id} .content .${temp_shape}`);

    }

    /*
     * function to make content reappear
     */
    this.appear = function (){

        let temp_shape = Gameboard.getOpponentShape().toUpperCase();
        if(GameController.isPlayerTurn()) {
            temp_shape = Gameboard.getPlayerShape().toUpperCase();
        }
        //console.log(typeof temp_shape.toUpperCase() + typeof " X");
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
        elem.removeEventListener('click', GameController.playRound);
        this.played = true;

        if(GameController.isPlayerTurn()) {
            current_shape = Gameboard.getPlayerShape();
        } else {
            current_shape = Gameboard.getOpponentShape();
        }
    }

};


/**
 * Controller object to control the flow of the game. Makes use of Gameboard Object.
 * @type {{playRound: playRound, startGame: startGame, isPlayerTurn: (function(): boolean)}}
 */
let GameController =  (() => {
    let player_turn = true;
    let aiPerception = new Array(9);

    const won = () => {
        let temp = false;

        //check rows
        for(let i = 0; i < 6; i+=3){
            if(aiPerception[i] === aiPerception[i+1] && aiPerception[i+1] === aiPerception[i+2]){
                return true
            }
        }

        //check cols
        for(let i = 0; i < 3; i++){
            if(aiPerception[i] === aiPerception[i+3] && aiPerception[i+3] === aiPerception[i+6]){
                return true
            }
        }

        //check diagonals
        if((aiPerception[0] === aiPerception[4] && aiPerception[4] === aiPerception[8]) ||
           (aiPerception[2] === aiPerception[4] && aiPerception[4] === aiPerception[6])){
            return true
        }

        return temp;
    }

    /**
     * Return player_turn (true if it is the players turn, false otherwise).
     */
    const isPlayerTurn = () =>{
        return player_turn;
    }

    /**
     * restart the AI perception of the board
     */
    const restartAIboard = () => {
        aiPerception = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    /**
     * initialize and open the Gameboard.
     */
    const startGame = () => {
        aiPerception = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        window.animatelo.fadeOut(`.Winner`);
        window.animatelo.fadeOut(`.title`);
        document.getElementById('win').style.visibility = 'hidden';
        Gameboard.init();
    }

    /**
     * TODO: more features later
     */
    const nextGame = () => {

    }

    /**
     * play a round of tic tac toe.
     * Note: a round = one player turn + one Ai turn (if no-one has won)
     *
     */
    function playRound (e){

        let played_cell = Gameboard.getCellByID(e.srcElement.parentNode.parentNode.id);



        if(played_cell) {
            played_cell.lockState(e);
            aiPerception[played_cell.id] = played_cell.getShape();
            player_turn = !player_turn;
        }
        printBoard();

        if(won()){
            document.getElementById('win').style.visibility = 'visible'
            window.animatelo.fadeInUp(`.Winner`);
            console.log('won');
        }
    }



    /**
     * print a simplified version of the grid.
     */
    function printBoard(){
        //console.log(aiPerception);
        for(let i = 0; i < 9; i++){
            //console.log(aiPerception[i]);
            if(i === 2 || i === 5){
                //console.log("\n");
            }
        }

    }

    /**
     * helper method to set player turn accordingly when changing shape.
     * @param turn true if it is the players turn, false if not.
     */
    function setPlayerTurn(turn){
        player_turn = turn;
    }


    return {startGame, playRound, isPlayerTurn, restartAIboard, setPlayerTurn};
})();

GameController.startGame();
