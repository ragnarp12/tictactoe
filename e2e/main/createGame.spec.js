'use strict';

describe('TicTacToe - Create game', function() {

    var createPage;

    beforeEach(function() {
        browser.get('/');
        createPage = require('./createGame.po');
    });

    it('should create one game', function() {
        createPage.gameName.sendKeys('createTest');
        createPage.userName.sendKeys('Ragnar');

        createPage.createGameBtn.click();
        browser.waitForAngular();

        var tictactoe = require('./tictactoe.po');

        expect(tictactoe.gameboard).toBeDefined();
        
    });

    it('should not be able to create game without any gamename', function() {
        createPage.gameName.sendKeys('');
        createPage.userName.sendKeys('Ragnar');

        browser.waitForAngular();

        expect(createPage.createGameBtn.getAttribute('ng-disabled')).toBeTruthy();
    });

    it('should not be able to create game without any username', function() {
        createPage.gameName.sendKeys('Prufa');
        createPage.userName.sendKeys('');

        browser.waitForAngular();

        expect(createPage.createGameBtn.getAttribute('ng-disabled')).toBeTruthy();
    });


});