
(function () {
    angular.module('myApp.me.services', [])
           .factory('meService', meService);

    meService.$inject = ["$q", "$http", "appConstants"];

    function meService($q, $http, appConstants) {

        var meService = {};
        return meService;
      

    }
})();