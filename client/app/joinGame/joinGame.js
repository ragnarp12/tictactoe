'use strict';

angular.module('tictactoeApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('joingame', {
                url: '/join/{gameId}',
                templateUrl: 'app/joinGame/joinGame.html',
                controller: 'JoinGameCtrl'
            });
    });