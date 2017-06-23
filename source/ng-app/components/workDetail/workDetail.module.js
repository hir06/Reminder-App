(function () {
    "use strict";

    angular.module('myApp.workDetail', [
        "myApp.workDetail.controller",
        "myApp.workDetail.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/workDetail/:projectName', {
            controller: 'workDetailController',
            controllerAs: 'DetailVM',
            templateUrl: 'ng-app/components/workDetail/workDetail.html',
            //resolve: {}
        });
        //.when('/workDetail', {
        //    controller: 'workController',
        //    controllerAs: 'DashboardVM',
        //    templateUrl: '../ng-app/components/work/partials/workDetails.html',
        //});
    }

})();