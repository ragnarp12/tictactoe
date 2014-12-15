'use strict';

describe('testing playGameController', function() {

    beforeEach(module('tictactoeApp'));

    var PlayController, scope, location, httpBackend, http;

    beforeEach(inject(function($injector, $controller, $rootScope, $http, $location) {
        scope = $rootScope.$new();
        http = $http;
        httpBackend = $injector.get('$httpBackend');
        location = $location;
        location.search('id', '111');
        location.search('gameSide', 'X');
        PlayController = $controller('TictactoeCtrl', {
            $scope: scope
        });
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should give proper values to scope variables: name, me and joinUrl', function() {

        runGame();

        expect(scope.me.userName).toBe('Ragnar');
        expect(scope.joinUrl).toBe('http://server:80/join/111');
        expect(scope.gameState.name).toBe('TheFirstGame');
    });

    it('should assign right user to gameSide O', function() {

        location.search('gameSide', 'O');

        runGame();

        expect(scope.me.userName).toBe('Asd');
    });

    it('should switch nextMove to O when move is made', function() {

        runGame();

        var currDate = new Date().toISOString();

        httpBackend.expectPOST('/api/placeMove', {
            id: '111',
            cmd: 'MovePlayer',
            user: {
                userName: 'Ragnar'
            },
            name: 'TheFirstGame',
            coord: [1, 1],
            timeStamp: currDate,
            side: 'X'
        }).respond([{
            event: 'PlayerMoved',
            user: {
                userName: 'Ragnar'
            },
            coord: [1, 1],
            timeStamp: currDate,
            side: 'X'
        }]);
        location.search('gameSide', 'X');

        scope.currDate = currDate;
        scope.placeMove([1, 1]);
        httpBackend.flush();

        expect(scope.myTurn()).toBe(false);


    });

    function runGame() {
        httpBackend.expectGET('/api/gameHistory/111').respond([{
            event: 'GameCreated',
            name: 'TheFirstGame',
            id: '111',
            user: {
                userName: 'Ragnar'
            }
        }, {
            event: 'GameJoined',
            name: 'TheFirstGame',
            id: '111',
            user: {
                userName: 'Asd'
            }
        }]);
        httpBackend.flush();
    }
});