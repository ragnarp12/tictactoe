'use strict';

describe('Tictactoe game play', function() {
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
        browser.sleep(500);
    }


    it('should create game, another joins it and should give X won', function() {

        createPage.gameName.sendKeys("Prufa2");
        createPage.userName.sendKeys("Jesus");
        createPage.createGameBtn.click();

        var tictactoe = require('./tictactoe.po');

        expect(tictactoe.gameboard).toBeDefined();

        tictactoe.joinLink.getAttribute('href').then(function(joinHref) {
            browser.getAllWindowHandles().then(function(handles) {
                var createHandle = handles[0];
                var joinerHandle = 'second-window';
                browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

                browser.switchTo().window(joinerHandle);
                joinPage.userName.sendKeys('Moses');
                joinPage.joinGameBtn.click();


                browser.driver.wait(function() {
                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                        return el === true;
                    });
                }).then(function() {
                    expect(tictactoe.myname.getText()).toBe('Moses');

                    browser.switchTo().window(createHandle).then(function() {
                        browser.driver.wait(function() {
                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                return el === true;
                            });
                        }).then(function() {

                            movePlayer(tictactoe.x0y0, 'X');

                            browser.switchTo().window(joinerHandle).then(function() {
                                browser.driver.wait(function() {
                                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                        return el === true;
                                    });
                                }).then(function() {

                                    movePlayer(tictactoe.x0y1, 'O');

                                    browser.switchTo().window(createHandle).then(function() {
                                        browser.driver.wait(function() {
                                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                return el === true;
                                            });
                                        }).then(function() {

                                            movePlayer(tictactoe.x0y2, 'X');

                                            browser.switchTo().window(joinerHandle).then(function() {
                                                browser.driver.wait(function() {
                                                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                        return el === true;
                                                    });
                                                }).then(function() {

                                                    movePlayer(tictactoe.x1y1, 'O');

                                                    browser.switchTo().window(createHandle).then(function() {
                                                        browser.driver.wait(function() {
                                                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                                return el === true;
                                                            });
                                                        }).then(function() {

                                                            movePlayer(tictactoe.x1y0, 'X');
                                                            browser.switchTo().window(joinerHandle).then(function() {
                                                                browser.driver.wait(function() {
                                                                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                                        return el === true;
                                                                    });
                                                                }).then(function() {

                                                                    movePlayer(tictactoe.x2y0, 'O');
                                                                    browser.switchTo().window(createHandle).then(function() {
                                                                        browser.driver.wait(function() {
                                                                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                                                return el === true;
                                                                            });
                                                                        }).then(function() {

                                                                            movePlayer(tictactoe.x2y1, 'X');
                                                                            browser.switchTo().window(joinerHandle).then(function() {
                                                                                browser.driver.wait(function() {
                                                                                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                                                        return el === true;
                                                                                    });
                                                                                }).then(function() {

                                                                                    movePlayer(tictactoe.x2y2, 'O');
                                                                                    browser.switchTo().window(createHandle).then(function() {
                                                                                        browser.driver.wait(function() {
                                                                                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                                                                return el === true;
                                                                                            });
                                                                                        }).then(function() {

                                                                                            movePlayer(tictactoe.x1y2, 'X');

                                                                                        });
                                                                                    });

                                                                                });
                                                                            });

                                                                        });
                                                                    });

                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});