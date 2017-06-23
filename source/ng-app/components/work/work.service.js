/// <reference path="../../../content/projectData.htm" />
/// <reference path="../../../content/projectData.htm" />
(function () {
    angular.module('myApp.work.services', [])
           .factory('workService', workService);

    workService.$inject = ["$q", "$http", "appConstants"];

    function workService($q, $http, appConstants) {


        var workService = {
            fetchProjectDetails: fetchProjectDetails,
            sendUserDetail:sendUserDetail
        };

        return workService;

        function fetchProjectDetails(params) {
            var def = $q.defer();

            var req = {
                method: 'GET',
                url: '../content/projectData.htm',
               
              
            }

            $http(req).then(function (response, status, headers, config) {
                def.resolve({
                    projectData: response.data
                    //quote_available: response.data.quote_available,
                    //quote_max: response.data.quote_max
                });
            }, function (arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }
        function sendUserDetail(params){
            var def=$q.defer();
            var req={
                method:'POST',
                url:'https://frontend-challenge-2.herokuapp.com/rest-auth/login/',
                data:{'username':'abc@example.com','email':'abc@example.com','password':'password'}
            }

        
      
            $http(req).then(function (response, status, headers, config) {
                def.resolve({
                    login: response.data.key
                 
                });
            }, function (arg) {
                def.reject(arg.data);
            });

    }}
})();