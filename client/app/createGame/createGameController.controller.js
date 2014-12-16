'use strict';

angular.module('tictactoeApp')
    .controller('CreateGameCtrl', ['$scope', '$location', '$http', 'uuid',
        function($scope, $location, $http, uuid) {


            $scope.createGame = function() {
                
                $scope.currDate = (!$scope.currDate) ? new Date().toISOString() : $scope.currDate;

                var newGamePost = {
                    id: uuid(),
                    cmd: 'CreateGame',
                    user: {
                        userName: $scope.userName
                    },
                    name: $scope.gameName,
                    timeStamp: $scope.currDate,
                    side: 'X'
                };


                var newGame = $http.post('/api/createGame', newGamePost);

                newGame.then(function(res) {
                    $location.url('/tictactoe');
                    $location.search('gameSide', 'X');
                    $location.search('id', res.data[0].id);
                });
            };
        }
    ]);