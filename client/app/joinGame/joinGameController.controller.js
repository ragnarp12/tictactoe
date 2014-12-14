'use strict';

angular.module('tictactoeApp')
    .controller('JoinGameCtrl', ['$scope', '$http', '$location', 'gameState', '$state',
        function($scope, $http, $location, gameState, $state) {

            var thenHandleEvents = function(postPromise) {
                postPromise.then(function(data) {
                    $scope.gameState.gameFunc(data.data);
                });
            };

            $scope.gameState = gameState();

            thenHandleEvents($http.get('/api/gameHistory/' + $state.params.gameId));

            $scope.joinGame = function() {

                $scope.currDate = (!$scope.currDate) ? new Date().toISOString() : $scope.currDate;

                var joinPostPromise = $http.post('/api/joinGame/', {
                    'id': $scope.gameState.id,
                    'cmd': 'JoinGame',
                    'user': {
                        'userName': $scope.userName,
                    },
                    'name': $scope.gameState.name,
                    'timeStamp': $scope.currDate,
                    'side': 'O'
                });

                thenHandleEvents(joinPostPromise);

                joinPostPromise.then(function() {
                    $location.url('/tictactoe');
                    $location.search('gameSide', 'O');
                    $location.search('id', $scope.gameState.id);
                });
            };
        }
    ]);