let game = {
    currentGame: [],
    score: 0,
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
    turnNumber: 0,
};

 /** clearing out fake data from the currentGame array */
function newGame() {
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];
    showScore();
    addTurn();
}

/** pushes a random choice */
function addTurn() {
    game.playerMoves = []; // clear the playerMoves

    /** Then, we're going to push onto  the computer game sequence,  
    we're going to go to our game.choices  key, which of course contains our four values, the IDs of our buttons. And then  we're going to use the math.random library to generate a random number between zero and  three. We're going to use that as the index of our choices array and then the resulting  choice is pushed onto the current game array. */
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

/** call the lightsOn function with the ID of one of our circles (circ) */
function lightsOn(circ) {
    document.getElementById(circ).classList.add("light"); // class will be added to circ
    setTimeout(() => { // remove class after 400 milliseconds
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurns() {
    game.turnNumber = 0; // set the turn number to 0

    /** we're going to use that as the array index number for our game currentGame array */
    let turns = setInterval(() => { // adding pause b/w lights being shown and next step in sequence
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++; // increment game turn number
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns); // sequence is finished, so clear interval, lights off
        }
    }, 800);
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };