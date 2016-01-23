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
                .state('publish', {
                    url: '/publish',
                    templateUrl: 'views/publish.html',
                    controller: publishCtrl
                })
                .state('gfqjz', {
                    url: '/gfqjz',
                    templateUrl: 'views/addition/gfqjz.html',
                    controller: gfqjzCtrl
                })
                .state('sbsfc', {
                    url: '/sbsfc',
                    templateUrl: 'views/service/sbsfc.html',
                    controller: sbsfcCtrl
                });
        }
    ]);
app.controller("topCtrl", topCtrl);
app.service("timeService",timeService);
angular.bootstrap($("html")[0], ['renshiya']);


//首屏控制器
function topCtrl($rootScope,$scope, $state,$http) {
    $rootScope.$state = $state;
    $rootScope.showPop = function(type){
        $rootScope.popType = type;
    }
    $rootScope.register = function(){
        $http.post('/index.php/User/Auth/register', {username:$scope.register_name,password:$scope.register_pwd,phone:$scope.register_phone,code:$scope.register_code}).
            success(function (data, status, headers, config) {
                $rootScope.showPop("");
                $rootScope.user = data;
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
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
}
function findCtrl($scope, $timeout, $interval) {

}
function publishCtrl($scope, $timeout, $interval) {

}

//外快 高峰期兼职
function gfqjzCtrl($scope,$rootScope, $http,timeService) {
    $scope.curView = "list";

    $http.get('/index.php/Addition/Gfqjz/position').
        success(function (data, status, headers, config) {
            $scope.positions = data ? data : [];
        }).
        error(function (data, status, headers, config) {
            console.log(status);
        });

    $scope.changeView = function(view){
        $scope.curView = view;
    }
    $scope.goDetail = function(id){
        $scope.changeView("detail");
         $http.get('/index.php/Addition/Gfqjz/position?id='+id).
             success(function (data, status, headers, config) {
                 //当前时间从后台返回
                 var curDate = new Date(data.time * 1000);
                 //岗位
                 $scope.curPosition = data.position? data.position : {};
                 //岗位认领记录
                 var instances = data.instance? data.instance : [];
                 //页面上的日期卡片
                 $scope.cards = [];
                 for(var i=0;i<7;i++){
                     //卡片从当日的下一日开始
                     curDate = timeService.getNextDate(curDate);
                     //卡片显示日期，星期，是否工作日，认领记录
                     $scope.cards[i] = {
                         "date":timeService.getDateMD(curDate),
                         "day":timeService.getDayFormat(curDate),
                         "YMD":timeService.getDateYMD(curDate),
                         "enable":!!timeService.getDayFlag($scope.curPosition.day_flag,curDate),
                         "instances":[]
                     }
                     for(var j=0;j<instances.length;j++){
                         if(instances[j].serve_date == timeService.getDateYMD(curDate)){
                             $scope.cards[i].instances.push(instances[j])
                         }
                     }
                 }
             }).
             error(function (data, status, headers, config) {
                 console.log(status);
             });

     }

    $scope.select = function(index){
        if($scope.cards[index].selected){
            $scope.cards[index].selected = false;
        }
        else if($scope.cards[index].enable && $scope.cards[index].instances.length < $scope.curPosition.number){
            $scope.cards[index].selected = true;
        }
    }

    $scope.claim = function(){
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        var serveDates = [];
        for(var i=0;i<$scope.cards.length;i++){
            if($scope.cards[i].selected){
                serveDates.push($scope.cards[i].YMD);
            }
        }
        $http.post('/index.php/Addition/Gfqjz/instance', {positionId:$scope.curPosition.id,serve_dates:serveDates}).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    console.log("认领成功");
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goClaimInfo = function(cardIndex){
        $scope.changeView("claimInfo");
        $scope.curCardIndex = cardIndex;
    }
}
//服务 上班顺风车
function sbsfcCtrl($scope,$rootScope, $http,timeService) {
    $scope.curView = "list";

    $http.get('/index.php/Service/Sbsfc/route').
        success(function (data, status, headers, config) {
            $scope.routes = data ? data : [];
        }).
        error(function (data, status, headers, config) {
            console.log(status);
        });

    $scope.changeView = function(view){
        $scope.curView = view;
    }
    $scope.goDetail = function(id){
        $scope.changeView("detail");
        $http.get('/index.php/Service/Sbsfc/route?id='+id).
            success(function (data, status, headers, config) {
                //当前时间从后台返回
                var curDate = new Date(data.time * 1000);
                //线路
                $scope.curRoute = data.route? data.route : {};
                //线路认领记录
                var instances = data.instance? data.instance : [];
                //页面上的日期卡片
                $scope.cards = [];
                for(var i=0;i<7;i++){
                    //卡片从当日的下一日开始
                    curDate = timeService.getNextDate(curDate);
                    //卡片显示日期，星期，是否工作日，认领记录
                    $scope.cards[i] = {
                        "date":timeService.getDateMD(curDate),
                        "day":timeService.getDayFormat(curDate),
                        "YMD":timeService.getDateYMD(curDate),
                        "enable":!!timeService.getDayFlag($scope.curRoute.day_flag,curDate),
                        "instances":[]
                    }
                    for(var j=0;j<instances.length;j++){
                        if(instances[j].serve_date == timeService.getDateYMD(curDate)){
                            $scope.cards[i].instances.push(instances[j])
                        }
                    }
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });

    }

    $scope.selectPoint = function(point){
        $scope.selectedPoint = point;
    }
    $scope.select = function(index){
        if($scope.cards[index].selected){
            $scope.cards[index].selected = false;
        }
        else if($scope.cards[index].enable && $scope.cards[index].instances.length < $scope.curRoute.number){
            $scope.cards[index].selected = true;
        }
    }

    $scope.claim = function(){
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        var serveDates = [];
        for(var i=0;i<$scope.cards.length;i++){
            if($scope.cards[i].selected){
                serveDates.push($scope.cards[i].YMD);
            }
        }
        $http.post('/index.php/Service/Sbsfc/instance', {routeId:$scope.curRoute.id,serve_dates:serveDates,point:$scope.selectedPoint}).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    console.log("认领成功");
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goClaimInfo = function(cardIndex){
        $scope.changeView("claimInfo");
        $scope.curCardIndex = cardIndex;
    }

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