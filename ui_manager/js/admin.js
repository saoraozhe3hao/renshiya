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
                .state('village', {
                    url: '/village',
                    templateUrl: 'views/admin/village.html',
                    controller: villageCtrl
                })
                .state('manager', {
                    url: '/manager',
                    templateUrl: 'views/admin/manager.html',
                    controller: managerCtrl
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
        if(window.admin){
            $rootScope.admin = JSON.parse(window.admin);
        }
    }

    //退出
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
        $scope.searchCounty = {
            provinceIndex:"0",
            cityIndex:"0"
        };
        setSearchInfo();
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
    function setSearchInfo(){
        var provinces = $scope.provinces;
        var searchCounty = $scope.searchCounty;
        searchCounty.province = provinces[searchCounty.provinceIndex].name;
        searchCounty.city = provinces[searchCounty.provinceIndex].cities[searchCounty.cityIndex];
    }

    $scope.changeSearchProvince = function(){
        $scope.searchCounty.cityIndex = "0";
        setSearchInfo();
    }

    $scope.changeSearchCity = function(){
        setSearchInfo();
    }

    $scope.search = function(){
        var searchInfo = $scope.searchCounty;
        $http.get('/index.php/Admin/County/county?province='+searchInfo.province+"&city="+searchInfo.city).
            success(function (data, status, headers, config) {
                $scope.counties = data ? data : [];
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

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
        setEditInfo();
        $scope.changeView("edit");
    }

    //detail 区
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
    function setEditInfo(){
        var provinces = $rootScope.provinces;
        var editCounty = $scope.editCounty;
        editCounty.province = provinces[editCounty.provinceIndex].name;
        editCounty.city = provinces[editCounty.provinceIndex].cities[editCounty.cityIndex];
    }

    $scope.changeEditProvince = function(){
        $scope.editCounty.cityIndex = "0";
        setEditInfo()
    }

    $scope.changeEditCity = function(){
        setEditInfo();
    }

    $scope.add = function(){
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

function villageCtrl($scope, $rootScope, $state,$http) {
    //公用区
    function init(){
        if(!$rootScope.admin){
            $state.go("login");
            return;
        }
        $scope.curView = "list";
        $scope.searchVillage = {
            provinceIndex:"0",
            cityIndex:"0",
            countyIndex:"0"
        };
        setSearchInfo();
    }

    function getCounties(){
        var searchInfo = $scope.searchVillage;
        $http.get('/index.php/Admin/County/county?province='+searchInfo.province+"&city="+searchInfo.city).
            success(function (data, status, headers, config) {
                $scope.counties = data ? data : [];
                $scope.searchVillage.countyIndex = "0";
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.changeView = function(view){
        $scope.curView = view;
    }

    //List 区
    function setSearchInfo(){
        var provinces = $scope.provinces;
        var searchInfo = $scope.searchVillage;
        searchInfo.province = provinces[searchInfo.provinceIndex].name;
        searchInfo.city = provinces[searchInfo.provinceIndex].cities[searchInfo.cityIndex];
        getCounties();
    }

    $scope.changeSearchProvince = function(){
        $scope.searchVillage.cityIndex = "0";
        setSearchInfo();
    }

    $scope.changeSearchCity = function(){
        setSearchInfo();
    }

    $scope.search = function(){
        var county_index = $scope.searchVillage.countyIndex;
        var searchStr = "?county_id="+$scope.counties[county_index].id;
        $http.get('/index.php/Admin/Village/village' + searchStr).
            success(function (data, status, headers, config) {
                $scope.villages = data ? data : [];
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goDetail = function(id){
        $scope.changeView("detail");
        $http.get('/index.php/Admin/Village/village?id='+id).
            success(function (data, status, headers, config) {
                $scope.curVillage = data.village? data.village : {};
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goAdd = function(){
        $scope.editVillage = { };
        $scope.changeView("add");
    }

    //detail 区
    $scope.goEdit = function(){
        $scope.editVillage = $scope.curVillage;
        $scope.changeView("edit");
    }

    $scope.remove = function(id){

        $http.delete('/index.php/Admin/Village/village?id='+id,null).
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
        var county_index = $scope.searchVillage.countyIndex;
        $scope.editVillage.county_id = $scope.counties[county_index].id;
        $http.post('/index.php/Admin/Village/village',$scope.editVillage).
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
        $http.put('/index.php/Admin/Village/village?id='+$scope.editVillage.id,$scope.editVillage).
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

function managerCtrl($scope, $rootScope, $state,$http) {
    //公用区
    function init(){
        if(!$rootScope.admin){
            $state.go("login");
            return;
        }
        $scope.curView = "list";
        $scope.searchVillage = {
            provinceIndex:"0",
            cityIndex:"0",
            countyIndex:"0",
            villageIndex:"0"
        };
        setSearchInfo();
    }

    function getCounties(){
        var searchInfo = $scope.searchVillage;
        $http.get('/index.php/Admin/County/county?province='+searchInfo.province+"&city="+searchInfo.city).
            success(function (data, status, headers, config) {
                $scope.counties = data ? data : [];
                $scope.searchVillage.countyIndex = "0";
                if($scope.curView == "add"){
                    getVillages();
                }
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.changeView = function(view){
        $scope.curView = view;
    }

    //List 区
    function setSearchInfo(){
        var provinces = $scope.provinces;
        var searchInfo = $scope.searchVillage;
        searchInfo.province = provinces[searchInfo.provinceIndex].name;
        searchInfo.city = provinces[searchInfo.provinceIndex].cities[searchInfo.cityIndex];
        getCounties();
    }

    $scope.changeSearchProvince = function(){
        $scope.searchVillage.cityIndex = "0";
        setSearchInfo();
    }

    $scope.changeSearchCity = function(){
        setSearchInfo();
    }

    $scope.search = function(){
        var county_index = $scope.searchVillage.countyIndex;
        var searchStr = "?county_id="+$scope.counties[county_index].id;
        $http.get('/index.php/Admin/Manager/manager' + searchStr).
            success(function (data, status, headers, config) {
                $scope.managers = data ? data : [];
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goDetail = function(id){
        $scope.changeView("detail");
        $http.get('/index.php/Admin/Manager/manager?id='+id).
            success(function (data, status, headers, config) {
                $scope.curManager = data.manager? data.manager : {};
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.goAdd = function(){
        $scope.editManager = { };
        $scope.changeView("add");
        getVillages();
    }

    //detail 区
    $scope.goEdit = function(){
        $scope.editManager = $scope.curManager;
        $scope.changeView("edit");
    }

    $scope.remove = function(id){

        $http.delete('/index.php/Admin/Manager/manager?id='+id,null).
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
    function getVillages(){
        $scope.searchVillage.villageIndex = "0";
        var county_index = $scope.searchVillage.countyIndex;
        var searchStr = "?county_id="+$scope.counties[county_index].id;
        $http.get('/index.php/Admin/Village/village'+searchStr).
            success(function (data, status, headers, config) {
                $scope.villages = data? data : [];
            }).
            error(function (data, status, headers, config) {
                console.log(status);
            });
    }

    $scope.add = function(){
        var village_index = $scope.searchVillage.villageIndex;
        $scope.editManager.village_id = $scope.villages[village_index].id;
        $http.post('/index.php/Admin/Manager/manager',$scope.editManager).
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
        $http.put('/index.php/Admin/Manager/manager?id='+$scope.editManager.id,$scope.editManager).
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