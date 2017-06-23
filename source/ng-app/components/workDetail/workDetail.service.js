/// <reference path="../../../content/projectData.htm" />
/// <reference path="../../../content/projectData.htm" />
(function () {
    angular.module('myApp.workDetail.services', [])
           .factory('workDetailService', workDetailService);

    workDetailService.$inject = ["$q", "$http", "appConstants"];

 


        //work_detailsService.$inject = ["$timeout"];

    function workDetailService($timeout) {
        var workDetailService = {
            };

        return workDetailService;
        }
    
})();