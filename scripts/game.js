let game = {
    currentGame: [],
    score: 0,
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
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
    //showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

module.exports = { game, newGame, showScore, addTurn };