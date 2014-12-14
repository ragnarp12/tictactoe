'use strict';

angular.module('tictactoeApp')
    .controller('TictactoeCtrl', ['$scope', '$location', '$http', '$interval', 'gameState',
        function($scope, $location, $http, $interval, gameState) {

            $scope.gameState = gameState();

            var thenHandleEvents = function(postPromise) {
                postPromise.then(function(data) {
                    $scope.gameState.gameFunc(data.data);
                });

                postPromise.then(function() {
                    if (mySide() === 'X') {
                        $scope.me = $scope.gameState.player1;
                        $scope.myside = 'X';
                        $scope.other = $scope.gameState.player2;
                        $scope.otherside = 'O';
                    } else {
                        $scope.other = $scope.gameState.player1;
                        $scope.otherside = 'X';
                        $scope.me = $scope.gameState.player2;
                        $scope.myside = 'O';
                    }
                    $scope.joinUrl = 'http://' + $location.host() + ($location.port() ? ':' + $location.port() : '') + '/join/' + $scope.gameState.id;
                });
            };

            var gameId = $location.search()['id'];

            function refresh() {
                thenHandleEvents($http.get('/api/gameHistory/' + gameId));
            }

            refresh();
            $interval(refresh, 1000);

            function mySide() {
                return $location.search()['gameSide'];
            }

            $scope.myTurn = function() {
                return mySide() === $scope.gameState.nextMove;
            };

            $scope.placeMove = function(coord) {
                if (!$scope.myTurn()) {
                    return;
                }

                $scope.currDate = (!$scope.currDate) ? new Date().toISOString() : $scope.currDate;

                var movingcommand = {
                    'id': $scope.gameState.id,
                    'cmd': 'MovePlayer',
                    'user': $scope.me,
                    'name': $scope.gameState.name,
                    'coord': coord,
                    'timeStamp': $scope.currDate,
                    'side': mySide()
                };

                var movePlayerPost = $http.post('/api/placeMove', movingcommand);

                thenHandleEvents(movePlayerPost);

            };
        }
    ]);