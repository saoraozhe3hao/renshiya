var app = angular.module("renshiya", ['ui.router']).
    config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/county');
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/admin/login.html',
                    controller: loginCtrl
                })
                .state('county', {
                    url: '/county',
                    templateUrl: 'views/admin/county.html',
                    controller: countyCtrl
                })
                .state('manager', {
                    url: '/manager',
                    templateUrl: 'views/admin/manager.html',
                    controller: managerCtrl
                })
                .state('user', {
                    url: '/user',
                    templateUrl: 'views/admin/user.html',
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
        $rootScope.provinces = window.provinces;
        if(window.admin){
            $rootScope.admin = JSON.parse(window.admin);
        }
    }

    $scope.logout = function(){
        $http.get('/index.php/Admin/Auth/logout').
            success(function (data, status, headers, config) {
                window.admin = "";
                $rootScope.admin = null;
                $state.go("login");
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }
    init();
}

//登录
function loginCtrl($scope, $http, $rootScope,$state) {

    $rootScope.login = function(){
        $http.post('/index.php/Admin/Auth/login', {username:$scope.login_name,password:$scope.login_pwd}).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    $rootScope.admin = data.admin;
                    $state.go("county");
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }
}

//区县管理
function countyCtrl($scope, $http, $rootScope,$state) {
    //公用区
    function init(){
        if(!$rootScope.admin){
            $state.go("login");
            return;
        }
        $scope.curView = "list";

        $http.get('/index.php/Admin/County/county').
            success(function (data, status, headers, config) {
                $scope.counties = data ? data : [];
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.changeView = function(view){
        $scope.curView = view;
    }

    //list 区
    $scope.goDetail = function(id){
        $scope.changeView("detail");
        $http.get('/index.php/Admin/County/county?id='+id).
            success(function (data, status, headers, config) {
                $scope.curCounty = data.county? data.county : {};
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goAdd = function(){
        // select 的 value 得是 字符串
        $scope.editCounty = {
            provinceIndex:"0",
            cityIndex:"0"
        };
        $scope.changeView("edit");
    }

    //detail 区
    $scope.changeProvince = function(){
        $scope.editCounty.cityIndex = "0";
    }

    $scope.goEdit = function(){
        $scope.editCounty = $scope.curCounty;
        for(var i=0;i < $scope.provinces.length;i++){
            if($scope.editCounty.province == $scope.provinces[i].name){
                $scope.editCounty.provinceIndex = "" + i;
                break;
            }
        }
        var cities = $scope.provinces[$scope.editCounty.provinceIndex].cities;
        for(var i=0;i < cities.length;i++){
            if($scope.editCounty.city == cities[i]){
                $scope.editCounty.cityIndex = "" + i;
                break;
            }
        }
        $scope.changeView("edit");
    }

    $scope.remove = function(id){

        $http.delete('/index.php/Admin/County/county?id='+id,null).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    init();
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    // edit 区
    $scope.add = function(){
        $scope.editCounty.province = $scope.provinces[$scope.editCounty.provinceIndex].name;
        $scope.editCounty.city = $scope.provinces[$scope.editCounty.provinceIndex].cities[$scope.editCounty.cityIndex];
        $http.post('/index.php/Admin/County/county',$scope.editCounty).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    init();
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.edit = function(){
        $http.put('/index.php/Admin/County/county?id='+$scope.editCounty.id,$scope.editCounty).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    init();
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    init();
}

function managerCtrl($scope, $timeout, $interval) {

}

function userCtrl($scope, $http,$rootScope) {

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