var app = angular.module("renshiya", ['ui.router']).
    config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/user');
            $stateProvider
                .state('user', {
                    url: '/user',
                    templateUrl: 'views/manager/user.html',
                    controller: userCtrl
                })
                .state('mine', {
                    url: '/mine',
                    templateUrl: 'views/manager/mine.html',
                    controller: mineCtrl
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/manager/login.html',
                    controller: loginCtrl
                });
        }
    ]);
app.controller("topCtrl", topCtrl);
app.service("timeService",timeService);
angular.bootstrap($("html")[0], ['renshiya']);


//首屏控制器
function topCtrl($rootScope,$scope, $state,$http) {

    //公共区
    function init(){
        $rootScope.$state = $state;
        $rootScope.provinces = window.provinces;
        if(window.manager){
            $rootScope.manager = JSON.parse(window.manager);
        }
    }

    //退出
    $scope.logout = function(){
        $http.get('/index.php/Manager/Auth/logout').
            success(function (data, status, headers, config) {
                window.manager = "";
                $rootScope.manager = null;
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
        $http.post('/index.php/Manager/Auth/login', {username:$scope.login_name,password:$scope.login_pwd}).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    $rootScope.manager = data.manager;
                    $state.go("user");
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }
}

//用户管理
function userCtrl($scope, $rootScope, $state,$http) {
    //公用区
    function init(){
        if(!$rootScope.manager){
            $state.go("login");
            return;
        }
        $scope.curView = "list";
        $http.get('/index.php/Manager/User/user').
            success(function (data, status, headers, config) {
                $scope.users = data ? data : [];
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
        $http.get('/index.php/Manager/User/user?id='+id).
            success(function (data, status, headers, config) {
                $scope.curUser = data.user? data.user : {};
                $scope.curMember = data.member? data.member : {};
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    //detail 区
    $scope.goEdit = function(){
        $scope.editUser = $scope.curUser;
        $scope.editMember = $scope.curMember;
        $scope.changeView("edit");
    }

    // edit 区
    $scope.edit = function(){
        var editData = {
            user:$scope.editUser,
            member:$scope.editMember
        }
        $http.put('/index.php/Manager/User/user?id='+$scope.editUser.id,editData).
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

//我的资料
function mineCtrl($scope, $rootScope, $state, $http) {
    //公用区
    function init(){
        if(!$rootScope.manager){
            $state.go("login");
            return;
        }
        $scope.curView = "detail";
    }

    $scope.changeView = function(view){
        $scope.curView = view;
    }

    //detail 区
    $scope.goEdit = function(){
        $scope.editManager = $scope.manager;
        $scope.changeView("edit");
    }

    // edit 区
    $scope.edit = function(){
        $http.put('/index.php/Manager/Manager/manager?id='+ $scope.editManager.id,$scope.editManager).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    $rootScope.manager = data.manager;
                    init();
                }
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