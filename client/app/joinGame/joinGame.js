'use strict';

angular.module('tictactoeApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('joingame', {
                url: '/join/{id}',
                templateUrl: 'app/joinGame/joinGame.html',
                controller: 'JoinGameCtrl'
            });
    });