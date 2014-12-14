'use strict';

angular.module('tictactoeApp')
    .controller('ListGamesCtrl', ['$scope', '$http',
        function($scope, $http) {

            var getAllGames = $http.get('/api/gameHistory');
            $scope.links = [];

            getAllGames.then(function(res) {
                $scope.links = res.data;
                //console.log($scope.links);
            });
        }
    ]);