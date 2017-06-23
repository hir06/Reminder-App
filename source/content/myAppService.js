/// <reference path="../../../content/projectData.htm" />
/// <reference path="../../../content/projectData.htm" />
var myAppService=(function () {
    angular.module('myApp')
           .factory('myAppService', function ($rootScope, $http, $location, $timeout,$q) {
               return{

                   fetchProjectDetails:function(){
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
               }
           });

  

})();