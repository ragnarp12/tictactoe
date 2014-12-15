'use strict';

describe('Factory: TictacToeState', function() {
    var gameState;

    // load the controller's module
    beforeEach(module('tictactoeApp'));

    // Initialize the controller and a mock scope
    beforeEach(inject(function(_gameState_) {
        gameState = _gameState_();
    }));


    afterEach(function() {});
    it('Should add other player to game state when gameJoined', function() {
        gameState.gameFunc([{
            event: "GameJoined",
            id: "111",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side: "O"
        }]);
        expect(gameState.player2.userName).toBe("Ragnar");
    });

    it('Should store game id and name from game created in game state.', function() {
        gameState.gameFunc([{
            event: "GameCreated",
            id: "198299",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }]);
        expect(gameState.id).toBe("198299");
        expect(gameState.name).toBe("TheFirstGame");
        expect(gameState.player1.userName).toBe("Ragnar");
    });

    it('Should add moves 0,1 to game board', function() {
        gameState.gameFunc([{
            event: "PlayerMoved",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            coord: [0, 1],
            side: 'X'
        }]);
        expect(gameState.board[0][1]).toBe("X");
    });

    it('Should add move 2,2 to board.', function() {
        gameState.gameFunc([{
            event: "PlayerMoved",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            coord: [2, 2],
            side: 'X'
        }]);
        expect(gameState.board[2][2]).toBe("X");
    });

    it('Should mark nextTurn as opposite from last event.', function() {
        gameState.player2 = 'O';

        gameState.gameFunc([{
            event: "PlayerMoved",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            coord: [2, 2],
            side: 'X'
        }]);
        expect(gameState.nextMove).toBe('O');
    });

    it('NextMove should default to X', function() {
        gameState.player1 = 'X';
        gameState.gameFunc([{
            event: "GameCreated",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            side: 'X'
        }]);
        expect(gameState.nextMove).toBe('X');
    });

    it('GameWon should set NextMove to GameWon', function() {
        gameState.player1 = 'X';
        gameState.gameFunc([{
            event: "GameWin",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            coord: [0,1]
        }]);
        expect(gameState.nextMove).toBe('GameWon');
        expect(gameState.winner.userName).toBe("Ragnar");
    });

    it('GameDraw should set nextTurn to GameOver', function() {
        gameState.player1 = 'X';

        gameState.gameFunc([{
            event: "GameDraw",
            user: {
                userName: "Ragnar"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29",
            coord: [0,1],
            side: 'X'
        }]);
        expect(gameState.nextMove).toBe('GameDraw');
        expect(gameState.draw).toBe(true);
    });

});