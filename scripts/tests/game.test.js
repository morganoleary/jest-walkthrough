/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns } = require("../game");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turn number key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => { // before running the tests this will...
        game.score = 42; // set the score
        game.playerMoves = ["button1", "button2"]; // data added to check it is cleared
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42"; // set score on the DOM
        newGame(); // if working the score will be reset
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1); // will contain 1 turn pushed on it
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0); // toEqual works as well
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

describe("gameplay works correctly", () => {
    beforeEach(() => { // runs before each test
        // reset the state each time and run addTurn to add new turn to current array
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => { // reset after each test
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2); // because we ran addTurn in beforeEach
    });
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]); // assing first element in array to button (we know there will always be at least 1 element)
        lightsOn(game.currentGame[0]); 
        expect(button.classList).toContain("light"); // does it contain the light class?
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 0; // set the game number
        showTurns(); // should reset the turn number
        expect(game.turnNumber).toBe(0);
    });
});