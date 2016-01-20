var app = angular.module("renshiya", ['ui.router']).
    config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/find');
            $stateProvider
                .state('find', {
                    url: '/find',
                    templateUrl: 'views/find.html',
                    controller: ["$scope", "$timeout", "$interval", homeCtrl]
                });
        }
    ]);
app.controller("topCtrl", ["$rootScope","$scope", "$state","$http", topCtrl]);
angular.bootstrap($("html")[0], ['renshiya']);

function topCtrl($rootScope,$scope, $state,$http) {
    $rootScope.$state = $state;
    $rootScope.http = function(){
        $http.get('/index.php/Home/index/index').
            success(function(data, status, headers, config) {
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                console.log(status);
            });
    }
}
function homeCtrl($scope, $timeout, $interval) {
    /*焦点轮播图，图片左浮动排成一排，最后一张图片在第一张前面再放一张（末图副）*/
    $scope.index = 1;
    //控制是否有过渡效果，末图和末图副之间切换不要过渡效果
    $scope.transition = true;
    var interval = null;
    var len = 6;
    var width = 900;
    $scope.left = width;


    $scope.next = function () {
        if ($scope.index === len) {
            $scope.transition = false;
            $scope.index = 0;
            $timeout(function () {
                $scope.transition = true;
                $scope.next();
            }, 50);
        }
        else {
            $scope.index += 1;
        }
        $scope.left = $scope.index * width;
    };

    $scope.prev = function () {
        if ($scope.index === 0) {
            $scope.transition = false;
            $scope.index = len;
            $timeout(function () {
                $scope.transition = true;
                $scope.prev();
            }, 50);
        }
        else {
            $scope.index -= 1;
        }
        $scope.left = $scope.index * width;
    };

    $scope.skip = function () {

    };

    $scope.play = function () {
        interval = $interval(function () {
            $scope.next();
        }, 3000);
    };

    $scope.stop = function () {
        $interval.cancel(interval);
    };
    $scope.$on("$viewContentLoaded", function () {
        $scope.play();
    });
    $scope.$on("$destroy", function () {
        $scope.stop();
    });
}
