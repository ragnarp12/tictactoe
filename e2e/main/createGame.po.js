/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */
'use strict';

var CreateGamePage = function() {
    this.container = element(by.css('#createContainer'));
    this.gameName = this.container.element(by.css('#gameName'));
    this.userName = this.container.element(by.css('#userName'));
    this.createGameBtn = this.container.element(by.css('#createGame'));
};

module.exports = new CreateGamePage();