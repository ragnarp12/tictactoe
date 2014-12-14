'use strict';

angular.module('tictactoeApp')
    .config(function($stateProvider) {

        $stateProvider
            .state('listgames', {
                url: '/list',
                templateUrl: 'app/listGames/listGames.html',
                controller: 'ListGamesCtrl'
            });
    });