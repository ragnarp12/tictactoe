'use strict';
describe('Controller: CreateGameCtrl', function() {

    // Load the controller's module
    beforeEach(module('tictactoeApp'));

    var CreateGameCtrl, scope, httpBackend, location;

    // Let call to uuid method return 111 as game id
    beforeEach(function() {
        module(function($provide) {
            $provide.value('uuid', function() {
                return '111';
            });
        });
    });

    // Initianlize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, $httpBackend, $location) {
        httpBackend = $httpBackend;
        location = $location;
        scope = $rootScope.$new();
        CreateGameCtrl = $controller('CreateGameCtrl', {
            $scope: scope
        });
    }));

    it('should post variables from scope for uuid, game name and userName and process resulting events, and assign me to X', function() {
        var currDate = new Date().toISOString();

        httpBackend.expectPOST('/api/createGame/', {
            id: '111',
            cmd: 'CreateGame',
            user: {
                userName: 'Ragnar',
            },
            name: 'TheSecondGame',
            timeStamp: currDate
        }).respond([{
            id: '111',
            event: 'GameCreated',
            user: {
                userName: 'Ragnar',
            },
            name: 'TheSecondGame'
        }]);


        scope.currDate = currDate;
        scope.gameName = 'TheSecondGame';
        scope.userName = 'Ragnar';
        scope.createGame();
        httpBackend.flush();
        expect(location.search()['gameId']).toBe('111');
        expect(location.path()).toBe('/tictactoe');
    });

    it('should post variables. Events should be no username', function() {
        var currDate = new Date().toISOString();

        httpBackend.expectPOST('/api/createGame/', {
            id: '111',
            cmd: 'CreateGame',
            user: {
                userName: '',
            },
            name: 'TheSecondGame',
            timeStamp: currDate
        }).respond([{
            id: '111',
            event: 'GameNoUserName',
            user: {
                userName: '',
            },
            name: 'TheSecondGame'
        }]);

        scope.gameName = 'TheSecondGame';
        scope.userName = '';
        scope.currDate = currDate;
        scope.createGame();
        httpBackend.flush();
        expect(location.search()['gameId']).toBe('111');
        expect(location.path()).toBe('/tictactoe');
    });

    it('should post variables. Events should be no game name', function() {
        var currDate = new Date().toISOString();

        httpBackend.expectPOST('/api/createGame/', {
            id: '111',
            cmd: 'CreateGame',
            user: {
                userName: 'Ragnar',
            },
            name: '',
            timeStamp: currDate
        }).respond([{
            id: '111',
            event: 'GameNoName',
            user: {
                userName: 'Ragnar',
            },
            name: ''
        }]);

        scope.gameName = '';
        scope.userName = 'Ragnar';
        scope.currDate = currDate;
        scope.createGame();
        httpBackend.flush();
        expect(location.search()['gameId']).toBe('111');
        expect(location.path()).toBe('/tictactoe');
    });

    it('should post variables. Events should be no timestamp', function() {
        // Will put '-' inside timeStamp because our code
        // will automatically generate DateTime if timeStamp is
        // null or ''
        // var currDate = new Date().toISOString();

        httpBackend.expectPOST('/api/createGame/', {
            id: '111',
            cmd: 'CreateGame',
            user: {
                userName: 'Ragnar',
            },
            name: 'TheSecondGame',
            timeStamp: '-'
        }).respond([{
            id: '111',
            event: 'GameNoTimeStamp',
            user: {
                userName: 'Ragnar',
            },
            name: 'TheSecondGame'
        }]);

        scope.gameName = 'TheSecondGame';
        scope.userName = 'Ragnar';
        scope.currDate = '-';
        scope.createGame();
        httpBackend.flush();
        expect(location.search()['gameId']).toBe('111');
        expect(location.path()).toBe('/tictactoe');
    });

});