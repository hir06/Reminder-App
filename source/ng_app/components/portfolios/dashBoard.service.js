(function() {
    angular.module('QuizApp.dashBoard.services', [])
        .factory('dashBoardService', dashBoardService);

    dashBoardService.$inject = ["$timeout", "$q", "$http", "appConstants"];

    function dashBoardService($timeout, $q, $http, appConstants) {

        //call service to get JSON data
        var dashBoardService = {
            fetchdashBoard: fetchdashBoard,
            loginUser: loginUser,
            RegisterUser: RegisterUser,
            getReminder: getReminder,
            addReminder: addReminder,
            saveReminder: saveReminder,
            deleteReminder: deleteReminder

        };

        return dashBoardService;

        function loginUser(userName, userPwd) {
            var def = $q.defer();

            var req = {

                url: ' https://frontend-challenge-2.herokuapp.com/rest-auth/login/',
                method: "POST",
                data: { 'username': userName, 'password': userPwd }


            }
            $http(req).then(function(response) {
                def.resolve({
                    key: response.data.key
                });
            }, function(arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

        function RegisterUser(userName, userPwd, userEmail) {
            var def = $q.defer();

            var req = {

                url: ' https://frontend-challenge-2.herokuapp.com/register/',
                method: "POST",
                data: { 'username': userName, 'password': userPwd, 'email': userEmail }


            }
            $http(req).then(function(response) {
                def.resolve({
                    key: response.data.key
                });
            }, function(arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

        function getReminder(token) {
            var def = $q.defer();

            var req = {
                url: ' https://frontend-challenge-2.herokuapp.com/reminders/',
                method: "GET",
                contentType: false,
                headers: { 'Authorization': 'Token ' + token + '' }


            }
            $http(req).then(function(response) {
                def.resolve({
                    remData: response.data
                });
            }, function(arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

        function addReminder(object) {
            var def = $q.defer();

            var req = {
                url: 'https://frontend-challenge-2.herokuapp.com/reminders/',
                method: "POST",
                contentType: false,
                data: {
                    'scheduled_datetime': object.scheduled_datetime,

                    'message': object.message,
                    'phone_number': object.phone_number
                },
                headers: { 'Authorization': 'Token ' + object.token + '' }


            }
            $http(req).then(function(response) {
                def.resolve({
                    data: response.data
                });
            }, function(arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

        function saveReminder(object) {
            var def = $q.defer();

            var req = {
                url: 'https://frontend-challenge-2.herokuapp.com/reminders/' + object.id + '/',
                method: "PUT",
                contentType: false,
                data: {
                    'scheduled_datetime': object.scheduled_datetime,

                    'message': object.message,
                    'phone_number': object.phone_number
                },
                headers: { 'Authorization': 'Token ' + object.token + '' }


            }
            $http(req).then(function(response) {
                def.resolve({
                    data: response.data
                });
            }, function(arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

        function deleteReminder(object) {
            var def = $q.defer();

            var req = {
                url: 'https://frontend-challenge-2.herokuapp.com/reminders/' + object.id + '/',
                method: "DELETE",
                headers: { 'Authorization': 'Token ' + object.token + '' }


            }
            $http(req).then(function(response) {
                def.resolve({
                    data: response.data
                });
            }, function(arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }

        function fetchdashBoard(params) {

            var def = $q.defer();

            var req = {
                method: 'GET',
                url: 'que.html',


            }
            $http(req).then(function(response) {
                def.resolve({
                    dashBoard: response.data.websites
                });
            }, function(arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }



    }
})();