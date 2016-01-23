var app = angular.module("renshiya", ['ui.router']).
    config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/find');
            $stateProvider
                .state('find', {
                    url: '/find',
                    templateUrl: 'views/find.html',
                    controller: findCtrl
                })
                .state('find_gfqjz', {
                    url: '/find_gfqjz',
                    templateUrl: 'views/find_addition/gfqjz.html',
                    controller: Find_gfqjzCtrl
                });
        }
    ]);
app.controller("topCtrl", topCtrl);
angular.bootstrap($("html")[0], ['renshiya']);

function topCtrl($rootScope, $state) {
    $rootScope.$state = $state;
}
function findCtrl($scope, $timeout, $interval) {

}
function Find_gfqjzCtrl($scope, $http) {

        $http.get('/index.php/Addition/Gfqjz/position').
            success(function(data, status, headers, config) {
                $scope.positions = data;
            }).
            error(function(data, status, headers, config) {
                console.log(status);
            });
}