'use strict';

describe('Tictactoe - Play Game', function() {
    var createPage;
    var joinPage;
    beforeEach(function() {
        browser.get('/');
        createPage = require('./createGame.po');
        joinPage = require('./joinGame.po');
    });

    function movePlayer(coord, exp) {
        browser.sleep(500);
        coord.click();
        expect(coord.getText()).toBe(exp);
    };



    it('should create one game and another user joins it then X makes a move', function(done) {
        createPage.gameName.sendKeys('playTest');
        createPage.userName.sendKeys('Ragnar');
        createPage.createGameBtn.click();

        var tictactoe = require('./tictactoe.po');

        expect(tictactoe.gameboard).toBeDefined();

        tictactoe.joinLink.getAttribute('href').then(function(joinHref) {
            browser.getAllWindowHandles().then(function(handles) {
                var creatorHandle = handles[0];
                var joinerHandle = 'play-window';
                browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');
                // switch to new window
                browser.switchTo().window(joinerHandle);

                joinPage.userName.sendKeys('Kiddi');
                joinPage.joinGameBtn.click();

                browser.driver.wait(function() {
                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                        return el === true;
                    });
                }).then(function() {
                    expect(tictactoe.myname.getText()).toBe('Kiddi');
                    expect(tictactoe.opponentname.getText()).toBe('Ragnar');

                    browser.switchTo().window(creatorHandle).then(function() {
                        browser.driver.wait(function() {
                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                return el === true;
                            });
                        }).then(function() {

                            movePlayer(tictactoe.x0y0, 'X');
                            done();
                        });
                    });
                });
            });
        });
    });

});