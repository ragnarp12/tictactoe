'use strict';

describe('Tictactoe game play', function() {
    var createPage;
    beforeEach(function() {
        browser.get('/');
        createPage = require('./createGame.po');
    });


    it('should create one game', function() {
        createPage.gameName.sendKeys('Prufa');
        createPage.userName.sendKeys('Ragnar');

        createPage.createGameBtn.click();

        var tictactoe = require('./tictactoe.po');

        expect(tictactoe.gameboard).toBeDefined();
    });

    it('should not be able to create game without any name', function() {
        createPage.gameName.sendKeys('');
        createPage.userName.sendKeys('Ragnar');
        expect(createPage.createGameBtn.getAttribute('ng-disabled')).toBeTruthy();
    });

    it('should not be able to create game without any username', function() {
        createPage.gameName.sendKeys('Prufa');
        createPage.userName.sendKeys('');
        expect(createPage.createGameBtn.getAttribute('ng-disabled')).toBeTruthy();
    });


});