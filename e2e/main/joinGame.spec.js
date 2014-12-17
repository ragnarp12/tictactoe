'use strict';

describe('Tictactoe game play', function() {
    var createPage;
    var joinPage;
    beforeEach(function() {
        browser.get('/');
        createPage = require('./createGame.po');
        joinPage = require('./joinGame.po');
    });


    it('should create one game and another user joins it', function() {
        createPage.gameName.sendKeys("Prufa");
        createPage.userName.sendKeys("Ragnar");

        createPage.createGameBtn.click();

        var tictactoe = require('./tictactoe.po');

        expect(tictactoe.gameboard).toBeDefined();
        expect(tictactoe.myname.getText()).toBe("Ragnar")


        tictactoe.joinLink.getAttribute('href').then(function(joinHref) {
            browser.getAllWindowHandles().then(function(handles) {
                var creatorHandle = handles[0];
                var joinerHandle = 'second-window';
                browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');
                // switch to new window
                browser.switchTo().window(joinerHandle);

                joinPage.userName.sendKeys("Kiddi");
                joinPage.joinGameBtn.click();

                browser.driver.wait(function() {
                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                        return el === true;
                    });
                }).then(function() {
                    expect(tictactoe.gameboard).toBeDefined();
                    expect(tictactoe.myname.getText()).toBe("Kiddi");
                    expect(tictactoe.opponentname.getText()).toBe("Ragnar");
                });
            });
        });
    });
});