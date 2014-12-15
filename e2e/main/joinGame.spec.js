'use strict';

describe('Tictactoe game play', function() {
    var createPage;
    var joinPage;
    beforeEach(function() {
        browser.get('/');
        createPage = require('./createGame.po');
        joinPage = require('./joinGame.po');
    });


    it('should create one game', function() {
        createPage.gameName.sendKeys("Prufa");
        createPage.userName.sendKeys("Ragnar");

        createPage.createGameBtn.click();
    });
});