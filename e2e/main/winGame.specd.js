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
    };



    it('should create game, another joins it and should give X won', function(done) {

        createPage.gameName.sendKeys("XWins");
        createPage.userName.sendKeys("Jesus");
        createPage.createGameBtn.click();

        var tictactoe = require('./tictactoe.po');

        browser.waitForAngular();
        expect(tictactoe.gameboard).toBeDefined();

        tictactoe.joinLink.getAttribute('href').then(function(joinHref) {
            browser.getAllWindowHandles().then(function(handles) {
                var createHandle = handles[0];
                var joinerHandle = 'win-window';
                browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

                browser.switchTo().window(joinerHandle);

                joinPage.userName.sendKeys('Moses');
                joinPage.joinGameBtn.click();

                browser.waitForAngular();

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

                            expect(tictactoe.myname.getText()).toBe('Jesus');
                            movePlayer(tictactoe.x0y0, 'X');

                            browser.switchTo().window(joinerHandle).then(function() {
                                browser.driver.wait(function() {
                                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                        return el === true;
                                    });
                                }).then(function() {

                                    expect(tictactoe.myname.getText()).toBe('Moses');
                                    movePlayer(tictactoe.x1y0, 'O');

                                    browser.switchTo().window(createHandle).then(function() {
                                        browser.driver.wait(function() {
                                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                return el === true;
                                            });
                                        }).then(function() {


                                            expect(tictactoe.myname.getText()).toBe('Jesus');
                                            movePlayer(tictactoe.x0y1, 'X');


                                            browser.switchTo().window(joinerHandle).then(function() {
                                                browser.driver.wait(function() {
                                                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                        return el === true;
                                                    });
                                                }).then(function() {

                                                    expect(tictactoe.myname.getText()).toBe('Moses');
                                                    movePlayer(tictactoe.x2y1, 'O');

                                                    browser.switchTo().window(createHandle).then(function() {
                                                        browser.driver.wait(function() {
                                                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                                return el === true;
                                                            });
                                                        }).then(function() {

                                                            expect(tictactoe.myname.getText()).toBe('Jesus');
                                                            movePlayer(tictactoe.x0y2, 'X');

                                                            expect(tictactoe.winner).toBeDefined();
                                                            expect(tictactoe.winner.getText()).toBe('X - Jesus WINS!');
                                                            done();
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



    it('should create game, another joins it and should give O won', function(done) {

        createPage.gameName.sendKeys('OWin');
        createPage.userName.sendKeys('Salka');
        createPage.createGameBtn.click();

        var tictactoe = require('./tictactoe.po');

        expect(tictactoe.gameboard).toBeDefined();
        expect(tictactoe.myname.getText()).toBe('Salka');

        tictactoe.joinLink.getAttribute('href').then(function(joinHref) {
            browser.getAllWindowHandles().then(function(handles) {
                var createHandle = handles[0];
                var joinerHandle = 'win2-window';
                browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

                browser.switchTo().window(joinerHandle);
                joinPage.userName.sendKeys('Valka');
                joinPage.joinGameBtn.click();


                browser.driver.wait(function() {
                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                        return el === true;
                    });
                }).then(function() {
                    expect(tictactoe.myname.getText()).toBe('Valka');

                    browser.switchTo().window(createHandle).then(function() {
                        browser.driver.wait(function() {
                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                return el === true;
                            });
                        }).then(function() {

                            expect(tictactoe.myname.getText()).toBe('Salka');
                            movePlayer(tictactoe.x1y0, 'X');

                            browser.switchTo().window(joinerHandle).then(function() {
                                browser.driver.wait(function() {
                                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                        return el === true;
                                    });
                                }).then(function() {

                                    expect(tictactoe.myname.getText()).toBe('Valka');
                                    movePlayer(tictactoe.x0y0, 'O');

                                    browser.switchTo().window(createHandle).then(function() {
                                        browser.driver.wait(function() {
                                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                return el === true;
                                            });
                                        }).then(function() {

                                            expect(tictactoe.myname.getText()).toBe('Salka');
                                            movePlayer(tictactoe.x2y1, 'X');

                                            browser.switchTo().window(joinerHandle).then(function() {
                                                browser.driver.wait(function() {
                                                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                        return el === true;
                                                    });
                                                }).then(function() {

                                                    expect(tictactoe.myname.getText()).toBe('Valka');
                                                    movePlayer(tictactoe.x0y1, 'O');

                                                    browser.switchTo().window(createHandle).then(function() {
                                                        browser.driver.wait(function() {
                                                            return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                                return el === true;
                                                            });
                                                        }).then(function() {

                                                            expect(tictactoe.myname.getText()).toBe('Salka');
                                                            movePlayer(tictactoe.x2y2, 'X');

                                                            browser.switchTo().window(joinerHandle).then(function() {
                                                                browser.driver.wait(function() {
                                                                    return browser.driver.isElementPresent(by.css('#gameboard')).then(function(el) {
                                                                        return el === true;
                                                                    });
                                                                }).then(function() {

                                                                    expect(tictactoe.myname.getText()).toBe('Valka');
                                                                    movePlayer(tictactoe.x0y2, 'O');
                                                                    browser.waitForAngular();

                                                                    expect(tictactoe.winner).toBeDefined();
                                                                    expect(tictactoe.winner.getText()).toBe('O - Valka WINS!');
                                                                    done();
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