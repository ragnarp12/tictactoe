'use strict';

var _ = require('lodash');
var TictactoePage = function() {

    this.container = element(by.css('#tictactoeContainer'));

    this.gameboard = this.container.element(by.css('#gameboard'));

    this.joinLink = this.container.element(by.css('#joinlink'));

    this.winner = this.container.element(by.css('.winner'));

    this.opponentname = this.container.element(by.css('#opponentname'));

    this.draw = this.container.element(by.css('.draw'));

    this.myname = this.container.element(by.css('#myname'));


    this.x0y0 = this.gameboard.element(by.css('.x0y0'));
    this.x0y1 = this.gameboard.element(by.css('.x0y1'));
    this.x0y2 = this.gameboard.element(by.css('.x0y2'));
    this.x1y0 = this.gameboard.element(by.css('.x1y0'));
    this.x1y1 = this.gameboard.element(by.css('.x1y1'));
    this.x1y2 = this.gameboard.element(by.css('.x1y2'));
    this.x2y0 = this.gameboard.element(by.css('.x2y0'));
    this.x2y1 = this.gameboard.element(by.css('.x2y1'));
    this.x2y2 = this.gameboard.element(by.css('.x2y2'));
};

module.exports = new TictactoePage();