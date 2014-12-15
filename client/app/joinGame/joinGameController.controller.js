'use strict';

angular.module('tictactoeApp')
    .controller('JoinGameCtrl', ['$scope', '$http', '$location', 'gameState', '$state',
        function($scope, $http, $location, gameState, $state) {

            var thenHandleEvents = function(postPromise) {
                postPromise.then(function(data) {
                    $scope.gameState.gameFunc(data.data);
                });
            };

            $scope.nameTaken = false;

            $scope.gameState = gameState();


            thenHandleEvents($http.get('/api/gameHistory/' + $state.params.id));

            $scope.joinGame = function() {
                
                $scope.p1 = $scope.gameState.player1.userName;

                if ($scope.p1 === $scope.userName) {
                    $scope.nameTaken = true;
                    return;
                }

                $scope.currDate = (!$scope.currDate) ? new Date().toISOString() : $scope.currDate;

                var command = {
                    'id': $scope.gameState.id,
                    'cmd': 'JoinGame',
                    'user': {
                        'userName': $scope.userName,
                    },
                    'name': $scope.gameState.name,
                    'timeStamp': $scope.currDate,
                    'side': 'O'
                };

                var joinPostPromise = $http.post('/api/joinGame', command);

                thenHandleEvents(joinPostPromise);

                joinPostPromise.then(function() {
                    $location.url('/tictactoe');
                    $location.search('gameSide', 'O');
                    $location.search('id', $scope.gameState.id);
                });
            };
        }
    ]);