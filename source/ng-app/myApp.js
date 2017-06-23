

(function () {
    'use strict';
    var myApp = angular.module("myApp", [
                    'ngRoute',
                    'myApp.work',
                    'myApp.me',
                    'myApp.workDetail'
                  
    ])


    myApp.config(['$routeProvider', '$compileProvider', '$locationProvider',
                      function ($routeProvider, $compileProvider, $locationProvider) {
                          
                         //  $locationProvider.html5Mode(true);
                          $routeProvider
                            .otherwise({
                                redirectTo: '/DashBoard'
                            });
                      },
    ]);
   
    myApp.run(function ($rootScope, $window) {
        console.log("myApp started successfully!");
    });

})();
