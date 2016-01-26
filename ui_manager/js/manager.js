var app = angular.module("renshiya", ['ui.router']).
    config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/county');
            $stateProvider
                .state('county', {
                    url: '/find',
                    templateUrl: 'views/county.html',
                    controller: countyCtrl
                })
                .state('manager', {
                    url: '/manager',
                    templateUrl: 'views/manager.html',
                    controller: managerCtrl
                })
                .state('user', {
                    url: '/user',
                    templateUrl: 'views/user.html',
                    controller: userCtrl
                });
        }
    ]);
app.controller("topCtrl", topCtrl);
app.service("timeService",timeService);
angular.bootstrap($("html")[0], ['renshiya']);


//首屏控制器
function topCtrl($rootScope,$scope, $state,$http) {

    function init(){
        $rootScope.$state = $state;
        if(window.user){
            $rootScope.user = JSON.parse(window.user);
        }
    }

    //弹出框区
    $rootScope.showPop = function(type){
        $rootScope.popType = type;
    }
    $rootScope.login = function(){
        $http.post('/index.php/User/Auth/login', {username:$scope.login_name,password:$scope.login_pwd}).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    $rootScope.showPop("");
                    $rootScope.user = data;
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    init();
}
function countyCtrl($scope, $timeout, $interval) {

}
function managerCtrl($scope, $timeout, $interval) {

}
function userCtrl($scope, $http,$rootScope) {

    function init(){
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
    }
    $scope.logout = function(id){
        $http.get('/index.php/User/Auth/logout').
            success(function (data, status, headers, config) {
                window.user = "";
                $rootScope.user = null;
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    init();
}

//服务
function timeService(){

}
timeService.prototype.oneDayMilli=1000 * 60 * 60 *24;
timeService.prototype.getNextDate = function(date){
    return new Date(date.getTime() + this.oneDayMilli);
}
timeService.prototype.getDateMD = function(date){
    var month = date.getMonth() + 1;
    month = month >= 10 ? month : "0" + month;
    var date = date.getDate();
    date = date >= 10 ? date : "0" + date;
    return month + "-" + date;
}
timeService.prototype.getDateYMD = function(date){
    return date.getFullYear() + "-" + this.getDateMD(date);
}
timeService.prototype.getDayFormat = function(date){
    var days = ["日","一","二","三","四","五","六"]
    return "星期"+days[date.getDay()];
}
timeService.prototype.getDayFlag = function(flag,date){
    var day = date.getDay();
    return parseInt(flag / Math.pow(10,day)) % 10;
}