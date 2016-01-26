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
                .state('mine', {
                    url: '/mine',
                    templateUrl: 'views/mine.html',
                    controller: mineCtrl
                })
                .state('bill', {
                    url: '/bill',
                    templateUrl: 'views/mine/bill.html',
                    controller: billCtrl
                })
                .state('comment', {
                    url: '/comment',
                    templateUrl: 'views/mine/comment.html',
                    controller: commentCtrl
                })
                .state('account', {
                    url: '/account',
                    templateUrl: 'views/mine/account.html',
                    controller: accountCtrl
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
                })
                .state('ban', {
                    url: '/ban?field&category&subject',
                    templateUrl: 'views/service/ban.html',
                    controller: banCtrl
                })
                .state('fuwu', {
                    url: '/fuwu',
                    templateUrl: 'views/service/fuwu.html',
                    controller: fuwuCtrl
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
                    $rootScope.user = data.user;
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }
    $rootScope.userInfo = function(id){
        $rootScope.showPop("user_info");
        $http.get('/index.php/User/Account/user?id='+id).
            success(function (data, status, headers, config) {
                $rootScope.checkUser = data.user ? data.user : {};
                $rootScope.checkMember = data.member ? data.member : {};
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });

        $http.get('/index.php/User/Comment/user_comment?user_id='+id).
            success(function (data, status, headers, config) {
                $rootScope.checkComments = data ? data : [];
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    init();
}
function findCtrl($scope, $timeout, $interval) {

}
function publishCtrl($scope, $timeout, $interval) {

}
function mineCtrl($scope, $http,$rootScope) {

    function init(){
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
    }
    $scope.logout = function(){
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

//我的 订单
function billCtrl($scope, $http) {
    //公用区
    function init(){
        $scope.curView = "list";
        $http.get('/index.php/User/Bill/bill').
            success(function (data, status, headers, config) {
                $scope.bills = data ? data : [];
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.changeView = function(view){
        $scope.curView = view;
    }

    //列表区
    $scope.goComment = function(index){
        $scope.changeView('comment');
        $scope.curBill = $scope.bills[index];
        var search = {
            service_type:$scope.curBill.service_type,
            service_id:$scope.curBill.service_id
        }
        $http.get('/index.php/User/Comment/bill_comment?service_type='+
            $scope.curBill.service_type+'&service_id='+$scope.curBill.service_id).
            success(function (data, status, headers, config) {
                $scope.comment = data;
                if(!$scope.comment){
                    $scope.goAddComment();
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goAddComment = function(){
        $scope.changeView("edit_comment");
        $scope.editComment = {
            service_type : $scope.curBill["service_type"],
            service_id : $scope.curBill["service_id"]
        };
    }

    //评论区
    $scope.removeComment = function(id){
        $http.delete('/index.php/User/Comment/bill_comment?id='+$scope.comment.id,null).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    init();
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goEditComment = function(){
        $scope.changeView("edit_comment");
        $scope.editComment = $scope.comment;
    }

    //编辑区
    $scope.addComment = function(){
        $http.post('/index.php/User/Comment/bill_comment',$scope.editComment).
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
        $http.put('/index.php/User/Comment/bill_comment?id='+$scope.editComment.id,$scope.editComment).
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

//我的 评论
function commentCtrl($scope, $http) {
    //公用区
    function init(){
        $scope.curView = "list";

        $http.get('/index.php/User/Comment/user_comment').
            success(function (data, status, headers, config) {
                $scope.comments = data ? data : [];
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    init();
}

//我的 账号
function accountCtrl($scope, $http) {
    //公用区
    function init(){
        $scope.curView = "detail";

        $http.get('/index.php/User/Account/user').
            success(function (data, status, headers, config) {
                $scope.user = data.user ? data.user : {};
                $scope.member = data.member ? data.member : {};
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    init();
}

//外快 高峰期兼职
function gfqjzCtrl($scope,$rootScope, $http,timeService) {

    //公用区
    function init(){
        $scope.curView = "list";

        $http.get('/index.php/Addition/Gfqjz/position').
            success(function (data, status, headers, config) {
                $scope.positions = data ? data : [];
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
        $http.get('/index.php/Addition/Gfqjz/position?id='+id).
             success(function (data, status, headers, config) {
                 //当前时间从后台返回
                 var curDate = new Date(data.time * 1000);
                 //岗位
                 $scope.curPosition = data.position? data.position : {};
                 //岗位认领记录
                 var instances = data.instance? data.instance : [];
                 //评论
                 $scope.comments = data.comment? data.comment : [];
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

    $scope.goAdd = function(){
        $scope.editPosition = {};
        $scope.changeView("edit");
    }

    //detail 区
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

    $scope.goEdit = function(){
        $scope.editPosition = $scope.curPosition;
        $scope.changeView("edit");
    }

    $scope.remove = function(id){
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.delete('/index.php/Addition/Gfqjz/position?id='+id,null).
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
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.post('/index.php/Addition/Gfqjz/position',$scope.editPosition).
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
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.put('/index.php/Addition/Gfqjz/position?id='+$scope.editPosition.id,$scope.editPosition).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    init();
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    //claim info 区
    $scope.cancel = function(id){
        $http.delete('/index.php/Addition/Gfqjz/instance?id='+id,null).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    $scope.goDetail($scope.curPosition.id);
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    init();
}

//服务 上班顺风车
function sbsfcCtrl($scope,$rootScope, $http,timeService) {

    //公共区
    function init(){
        $scope.curView = "list";
        $http.get('/index.php/Service/Sbsfc/route').
            success(function (data, status, headers, config) {
                $scope.routes = data ? data : [];
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
        $http.get('/index.php/Service/Sbsfc/route?id='+id).
            success(function (data, status, headers, config) {
                //当前时间从后台返回
                var curDate = new Date(data.time * 1000);
                //线路
                $scope.curRoute = data.route? data.route : {};
                //线路认领记录
                var instances = data.instance? data.instance : [];
                //评论
                $scope.comments = data.comment? data.comment : [];
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

    $scope.goAdd = function(){
        $scope.editRoute = {};
        $scope.changeView("edit");
    }

    //detail 区
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

    $scope.goEdit = function(){
        $scope.editRoute = $scope.curRoute;
        $scope.changeView("edit");
    }

    $scope.remove = function(id){
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.delete('/index.php/Service/Sbsfc/route?id='+id,null).
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
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.post('/index.php/Service/Sbsfc/route',$scope.editRoute).
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
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.put('/index.php/Service/Sbsfc/route?id='+$scope.editRoute.id,$scope.editRoute).
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

//服务 班团
function banCtrl($scope,$rootScope, $http,$stateParams) {

    //公共区
    function init(){
        $scope.curView = "list";
        $http.get('/index.php/Service/Ban/class',$stateParams).
            success(function (data, status, headers, config) {
                $scope.classes = data ? data : [];
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
        $http.get('/index.php/Service/Ban/class?id='+id).
            success(function (data, status, headers, config) {
                //线路
                $scope.curClass = data.class? data.class : {};
                //线路认领记录
                $scope.instances = data.instance? data.instance : [];
                //评论
                $scope.comments = data.comment? data.comment : [];
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goAdd = function(){
        $scope.editClass = {};
        $scope.changeView("edit");
    }

    //detail 区
    $scope.goEdit = function(){
        $scope.editClass = $scope.curClass;
        $scope.changeView("edit");
    }

    $scope.claim = function(){
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.post('/index.php/Service/Ban/instance', {classId:$scope.curClass.id}).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    $scope.goDetail($scope.curClass.id);
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.remove = function(id){
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.delete('/index.php/Service/Ban/class?id='+id,null).
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
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.post('/index.php/Service/Ban/class',$scope.editClass).
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
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.put('/index.php/Service/Ban/class?id='+$scope.editClass.id,$scope.editClass).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    $scope.goDetail($scope.editClass.id);
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    init();
}

//服务 一般服务
function fuwuCtrl($scope,$rootScope, $http,timeService) {

    //公共区
    function init(){
        $scope.curView = "list";
        $http.get('/index.php/Service/Fuwu/item').
            success(function (data, status, headers, config) {
                $scope.items = data ? data : [];
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
        $http.get('/index.php/Service/Fuwu/item?id='+id).
            success(function (data, status, headers, config) {
                $scope.curItem = data.class? data.class : {};
                //评论
                $scope.comments = data.comment? data.comment : [];
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goAdd = function(){
        $scope.editItem = {};
        $scope.changeView("edit");
    }

    //detail 区
    $scope.goEdit = function(){
        $scope.editItem = $scope.curItem;
        $scope.changeView("edit");
    }

    $scope.claim = function(){
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.post('/index.php/Service/Fuwu/instance', {itemId:$scope.curItem.id}).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    $scope.goDetail($scope.curItem.id);
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.remove = function(id){
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.delete('/index.php/Service/Fuwu/item?id='+id,null).
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
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.post('/index.php/Service/Fuwu/item',$scope.editItem).
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
        if(!$rootScope.user){
            $rootScope.showPop('login');
            return;
        }
        $http.put('/index.php/Service/Fuwu/item?id='+$scope.editItem.id,$scope.editItem).
            success(function (data, status, headers, config) {
                if(data.code == 200){
                    $scope.goDetail($scope.editItem.id);
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