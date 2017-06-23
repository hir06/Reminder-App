(function () {
    "use strict";

    angular.module('myApp.me', [
        "myApp.me.controller",
        "myApp.me.services",
    ])
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
        $routeProvider.when('/about', {
            controller: 'meController',
            controllerAs: 'mvm',
            templateUrl: 'ng-app/components/me/me.html',
            //resolve: {}
        });
    }

})();