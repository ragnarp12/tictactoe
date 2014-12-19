describe('TicTacToe - Join Game', function() {

    var createPage;
    var joinPage;

    beforeEach(function() {
        browser.get('/');
        createPage = require('./createGame.po');
        joinPage = require('./joinGame.po');
    });

    it('should be able to join the game', function(done) {
        createPage.gameName.sendKeys('JoinTest');
        createPage.userName.sendKeys('Ragnar');
        createPage.createGameBtn.click();

        var tictactoe = require('./tictactoe.po');

        tictactoe.joinLink.getAttribute('href').then(function(joinHref) {
            browser.getAllWindowHandles().then(function(handles) {

                var creatorHandle = handles[0];
                var joinerHandle = 'join-window';

                browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

                browser.switchTo().window(joinerHandle);

                joinPage.userName.sendKeys('Kiddi');
                joinPage.joinGameBtn.click();

                browser.waitForAngular();

                expect(tictactoe.gameboard).toBeDefined();
                done();
            });
        });
    });

    it('should show error, when name same as other user', function(done) {

        createPage.gameName.sendKeys('JoinTest');
        createPage.userName.sendKeys('Ragnar');
        createPage.createGameBtn.click();

        var playPage = require('./tictactoe.po');

        playPage.joinLink.getAttribute('href').then(function(joinHref) {
            browser.getAllWindowHandles().then(function(handles) {

                var creatorHandle = handles[0];
                var joinerHandle = 'join-window';

                browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

                browser.switchTo().window(joinerHandle);
                expect(joinPage.nameTaken.getText()).toBe('');
                joinPage.userName.sendKeys('Ragnar');
                joinPage.joinGameBtn.click();
                browser.waitForAngular();
                expect(joinPage.nameTaken.getText()).toBe('Username already taken');
                done();
            });
        });
    });


    it('should be not able to join when there is no input', function(done) {

        createPage.gameName.sendKeys('JoinTest');
        createPage.userName.sendKeys('Ragnar');
        createPage.createGameBtn.click();

        var tictactoe = require('./tictactoe.po');

        tictactoe.joinLink.getAttribute('href').then(function(joinHref) {
            browser.getAllWindowHandles().then(function(handles) {

                var creatorHandle = handles[0];
                var joinerHandle = 'join-window';

                browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

                browser.switchTo().window(joinerHandle);
                joinPage.userName.sendKeys('');
                expect(joinPage.joinGameBtn.getAttribute('ng-disabled')).toBeTruthy();
                done();
            });
        });
    });

    it('should not be able to join if the username is to long', function(done) {

        createPage.gameName.sendKeys('JoinTest');
        createPage.userName.sendKeys('Ragnar');
        createPage.createGameBtn.click();

        var playPage = require('./tictactoe.po');

        playPage.joinLink.getAttribute('href').then(function(joinHref) {
            browser.getAllWindowHandles().then(function(handles) {

                var creatorHandle = handles[0];
                var joinerHandle = 'join-window';

                browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

                browser.switchTo().window(joinerHandle);
                joinPage.userName.sendKeys('thisnameistolongforthisgame');
                browser.waitForAngular();
                expect(joinPage.joinGameBtn.getAttribute('ng-disabled')).toBeTruthy();
                done();
            });
        });
    });

});