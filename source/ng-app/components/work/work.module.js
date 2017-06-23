(function () {
    "use strict";

    angular.module('myApp.work', [
        "myApp.work.controller",
        "myApp.work.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/DashBoard', {
            controller: 'workController',
            controllerAs: 'DashboardVM',
            templateUrl: '../ng-app/components/work/work.html',
            //resolve: {}
        });
        //.when('/workDetail/:projectName', {
        //    controller: 'workController',
        //    controllerAs: 'DashboardVM',
        //    templateUrl: '../ng-app/components/work/partials/workDetails.html',
        //});
    }

})();