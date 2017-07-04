(function() {
    "use strict";
    angular.module('QuizApp.dashBoard.controllers', [])
        .controller('dashBoardController', dashBoardController);

    dashBoardController.$inject = ['$rootScope', '$scope', '$route', '$location', '$timeout', '$interval', '$http', 'AppService', 'dashBoardService', 'appConstants'];

    function dashBoardController($rootScope, $scope, $route, $location, $timeout, $interval, $http, AppService, dashBoardService, appConstants) {
        var _this = this;


        window.scrollTo(0, 0);
        _this.AppService = AppService;
        _this.userName = "";
        _this.userEmail = "";
        _this.userPwd = "";
        _this.editable = [];
        _this.login = false;
        _this.isRegister = false;
        _this.loginError = false;
        _this.loginUser = loginUser;

        _this.openPushPopUp = openPushPopUp;
        _this.showAllAnswer = showAllAnswer;
        _this.showGraph = showGraph;
        _this.queState = [true, false, false, false, false];
        _this.correctAns = [];
        _this.ans = [];
        _this.boolArr = [];
        _this.myData = [];
        _this.shoqQue = shoqQue;
        _this.saveAns = saveAns;
        _this.openLogin = openLogin;
        _this.openRegister = openRegister;
        _this.addReminder = addReminder;
        _this.deleteReminder = deleteReminder;
        _this.cancelReminder = cancelReminder;
        _this.editReminder = editReminder;
        _this.saveReminder = saveReminder;
        _this.FormatDate = FormatDate;
        _this.newDate = [];
        _this.newTime = [];
        _this.splitDate = splitDate;
        _this.splitTime = splitTime
        _this.showAnswer = false;
        //add reminder
        _this.reminderMsg = "";
        _this.reminderPhn = "";
        _this.reminderDate = "";
        _this.reminderTime = "";
        _this.logOut = logOut;
        _this.buttonText = "Login";

        $('#onepush-modal').modal('open');

        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year
            format: 'yyyy-mm-dd',
            min: new Date()
        });

        function logOut() {
            _this.login = false;
            $('#onepush-modal').modal('open');
            _this.token = "";
        }

        function openLogin() {
            $('#onepush-modal').modal('open');
            _this.isRegister = false;
            _this.buttonText = "Login";
        }

        function openRegister() {
            $('#onepush-modal').modal('open');
            _this.isRegister = true;
            _this.buttonText = "Register"
        }

        function splitDate(date) {
            return date.split('T')[0];
        }

        function splitTime(date) {
            return date.split('T')[1];
        }

        function FormatDate(date) {
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            var dat = date.split('T')[0];
            var day = dat.split('-')[2];
            var year = dat.split('-')[0];
            var mon = parseInt(dat.split('-')[1]);
            var time = (date.split('T')[1]).split('.')[0]
            return day + " " + monthNames[mon - 1] + " " + year + " At " + time;
            // alert('here');
        }

        $('.timepicker').pickatime({
            default: 'now', // Set default time
            fromnow: 0, // set default time to * milliseconds from now (using with default = 'now')
            twelvehour: false, // Use AM/PM or 24-hour format
            donetext: 'OK', // text for done-button
            cleartext: 'Clear', // text for clear-button
            canceltext: 'Cancel', // Text for cancel-button
            autoclose: false, // automatic close timepicker
            ampmclickable: true, // make AM PM clickable
            min: new Date(),
            aftershow: function() {} //Function for after opening timepicker  
        });






        function loginUser() {
            $('#onepush-modal').modal('close');

            if (_this.isRegister == false) {
                AppService.ShowLoader();
                var promiseObj = dashBoardService.loginUser(_this.userName, _this.userPwd);
                promiseObj.then(function success(data) {
                        _this.login = true;
                        _this.token = data.key;

                        console.log(_this.token);
                        $('#onepush-modal').modal('close');
                        AppService.HideLoader();
                        getReminder();

                    },
                    function error() {
                        Materialize.toast("Couldn't login", 4000, "red");
                        _this.loginError = true;
                        $('#onepush-modal').modal('open');

                        AppService.HideLoader();
                    });
            } else {
                AppService.ShowLoader();
                var promiseObj = dashBoardService.RegisterUser(_this.userEmail, _this.userPwd, _this.userCnfPwd);
                promiseObj.then(function success(data) {
                        _this.login = true;
                        _this.token = data.key;

                        console.log(_this.token);
                        AppService.HideLoader();
                        $('#onepush-modal').modal('close');
                        getReminder();
                    },
                    function error() {
                        Materialize.toast("User corresponding to email already exist", 4000, "red ");
                        AppService.HideLoader();
                        $('#onepush-modal').modal('open');

                        _this.loginError = true;

                    });

            }

        }

        function getReminder() {
            AppService.ShowLoader();
            var promiseObj = dashBoardService.getReminder(_this.token);
            promiseObj.then(function success(data) {

                    _this.data = data.remData;
                    AppService.HideLoader();
                    // console.log(_this.token);
                },
                function error() {
                    Materialize.toast("Couldn't get reminder data", 4000, "red");
                    AppService.HideLoader();
                });


        }

        function addReminder() {

            var object = {
                'scheduled_datetime': $('.datepicker').val() + "T" + $('.timepicker').val(),

                'message': _this.reminderMsg,
                'phone_number': _this.reminderPhn,
                'token': _this.token
            }
            AppService.ShowLoader();
            var promiseObj = dashBoardService.addReminder(object);
            promiseObj.then(function success(data) {

                    _this.data = data;
                    AppService.HideLoader();
                    getReminder(_this.token);


                },
                function error() {
                    Materialize.toast("Couldn't add reminder data", 4000, "red")
                });

        }

        function deleteReminder(object) {
            var params = {
                'id': object.id,
                'token': _this.token
            }
            AppService.ShowLoader();
            var promiseObj = dashBoardService.deleteReminder(params);
            promiseObj.then(function success(data) {

                    _this.data = data;
                    AppService.HideLoader();
                    getReminder(_this.token);


                },
                function error() {
                    Materialize.toast("Couldn't delete reminder data", 4000, "red");
                    AppService.HideLoader();
                });

        }

        function editReminder(object) {

            _this.editable[object.id] = true;
            _this.newDate[object.id] = object.scheduled_datetime.split('T')[0];
            _this.newTime[object.id] = object.scheduled_datetime.split('T')[1];

        }

        function saveReminder(rem) {
            _this.editable[rem.id] = false;
            var object = {
                'scheduled_datetime': _this.newDate[rem.id] + "T" + _this.newTime[rem.id],
                'id': rem.id,
                'message': rem.message,
                'phone_number': rem.phone_number,
                'token': _this.token
            }
            AppService.ShowLoader();
            var promiseObj = dashBoardService.saveReminder(object);
            promiseObj.then(function success(data) {

                    _this.data = data;
                    AppService.HideLoader();
                    getReminder(_this.token);

                },
                function error() {
                    Materialize.toast("Couldn't add reminder data", 4000, "red");
                    AppService.HideLoader();
                });
        }

        function cancelReminder(rem) {
            _this.editable[rem.id] = false;
            getReminder(_this.token);

        }

        function shoqQue(id) {

            if (queState[id - 1] == true) return true;

            else
                return false;
        }

        function saveAns(object) {
            var id = object.target.id.split('')[0];
            var tempAns = object.target.id.split('')[1];
            _this.ans[id] = tempAns;
            console.log(_this.ans);
            //afte clicking wait for a second while moving to next question
            $timeout(
                function() {
                    if (id < _this.data.length - 1) {
                        _this.queState[parseInt(id) + 1] = true;
                        _this.queState[id] = false;
                    }
                    //alert("Called after delay.");
                },
                1000);



        }
        //to show all the questions
        function showAllAnswer() {
            _this.showAnswer = true;
            for (var i = 0; i <= _this.data.length; i++) {
                _this.queState[i] = true;
                document.getElementById(i + _this.ans[i]).checked = true;


            }

        }


        //to generate a graph
        function showGraph() {
            $('#graph-modal').openModal();
            _this.myData = [];
            for (var i = 0; i < _this.data.length; i++) {
                _this.correctAns[i] = _this.data[i].answer;
                if (_this.correctAns[i] == _this.ans[i]) {
                    _this.boolArr[i] = 1;
                } else {
                    _this.boolArr[i] = 0;
                }
            }
            for (var i = 0; i < _this.data.length; i++) {
                var obj = {
                    name: i + 1,
                    y: _this.boolArr[i]

                };
                _this.myData.push(obj);
            }
            // Create the chart
            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'This graph shows your answers'
                },

                xAxis: {
                    type: 'Question'
                },
                yAxis: {
                    title: {
                        text: 'Total percent mark'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

                series: [{

                    data: _this.myData

                }]

            });
        }

        //function to be called to get json data from service
        // function fetchdashBoard() {
        //     var promiseObj = dashBoardService.fetchdashBoard();
        //     promiseObj.then(function success(data) {

        //             _this.data = data;


        //         },
        //         function error() {
        //             Materialize.toast("Couldn't load Questions!", 4000, "red")
        //         });
        // }


        //to get login popup
        function openPushPopUp() {

            $('#onepush-modal').openModal();
        }



        // fetchdashBoard();

    }

})();