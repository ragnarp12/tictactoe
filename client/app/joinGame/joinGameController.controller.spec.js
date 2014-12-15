'use strict';


describe('Controller: JoinGameCtrl', function() {

    // load the controller's module
    beforeEach(module('tictactoeApp'));
    var JoinGameCtrl, scope;
    var httpBackend;
    var location;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, $httpBackend, $location, $state) {
        httpBackend = $httpBackend;
        location = $location;
        $state.params['id'] = '111';

        scope = $rootScope.$new();
        JoinGameCtrl = $controller('JoinGameCtrl', {
            $scope: scope
        });
    }));

    it('should not be available to join non existing game', function() {
        httpBackend.expectGET('/api/joinGame', {
            id: '111',
            cmd: 'JoinGame',
            user: {
                userName: 'Ragnar'
            },
            name: 'The Game',
            timeStamp: '2014-12-02T11:29:29',
            side: 'O'
        }).respond([{
            event: 'NoGameWithThisId',
            user: {
                userName: 'Ragnar'
            },
            name: 'The Game',
            timeStamp: '2014-12-02T11:29:29',
            side: 'O'
        }])
    });

    it('should not be available to join without username', function() {
        httpBackend.expectGET('/api/joinGame', {
            id: '111',
            cmd: 'JoinGame',
            user: {
                userName: ''
            },
            name: 'The Game',
            timeStamp: '2014-12-02T11:29:29',
            side: 'O'
        }).respond([{
            event: 'JoinNoNameProvided',
            user: {
                userName: ''
            },
            name: 'The Game',
            timeStamp: '2014-12-02T11:29:29',
            side: 'O'
        }])
    });

    it('should not be available to join without timeStamp', function() {
        httpBackend.expectGET('/api/joinGame', {
            id: '111',
            cmd: 'JoinGame',
            user: {
                userName: 'Ragnar'
            },
            name: 'The Game',
            timeStamp: '2014-12-02T11:29:29',
            side: 'O'
        }).respond([{
            event: 'NoTimeStamp',
            user: {
                userName: 'Ragnar'
            },
            name: 'The Game',
            timeStamp: '2014-12-02T11:29:29',
            side: 'O'
        }])
    });

    it('should not be available to join without id', function() {
        httpBackend.expectGET('/api/joinGame', {
            id: '',
            cmd: 'JoinGame',
            user: {
                userName: 'Ragnar'
            },
            name: 'The Game',
            timeStamp: '',
            side: 'O'
        }).respond([{
            event: 'NoIdProvided',
            id: '',
            user: {
                userName: 'Ragnar'
            },
            name: 'The Game',
            timeStamp: '',
            side: 'O'
        }])
    });

    it('should ask to join game if game id already in scope, and assign me to O', function() {

        var currDate = new Date().toISOString();
        scope.currDate = currDate;

        httpBackend.expectGET('/api/gameHistory/111').respond([{
            event: 'GameCreated',
            name: 'The Game',
            id: '111',
            user: {
                userName: 'Ragnar'
            }
        }]);

        httpBackend.expectGET('app/createGame/createGame.html').respond('');

        httpBackend.flush();

        httpBackend.expectPOST('/api/joinGame', {
            id: '111',
            cmd: 'JoinGame',
            user: {
                userName: 'Kiddi',
            },
            name: 'The Game',
            timeStamp: currDate,
            side: 'O'
        }).respond([{
            event: 'GameJoined'
        }]);
        scope.userName = 'Kiddi';
        //scope.p1 = 'Ragnar';

        scope.joinGame();
        httpBackend.expectGET('app/tictactoeController/tictactoe.html').respond('');
        httpBackend.flush();
        expect(location.search()['gameSide']).toBe('O');
        expect(location.search()['id']).toBe('111');
        expect(location.path()).toBe('/tictactoe');
    });
});