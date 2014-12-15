'use strict';

describe('Tictactoe game play', function() {
    var createPage;
    beforeEach(function() {
        browser.get('/');
        createPage = require('./createGame.po');
    });


    it('should create one game', function() {
        createPage.gameName.sendKeys("Prufa");
        createPage.userName.sendKeys("Ragnar");

        createPage.createGameBtn.click();
    });
});