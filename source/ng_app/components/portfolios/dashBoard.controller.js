(function() {
  "use strict";
  angular
    .module("QuizApp.dashBoard.controllers", [])
    .controller("dashBoardController", dashBoardController);

  dashBoardController.$inject = [
    "$rootScope",
    "$scope",
    "$route",
    "$location",
    "$timeout",
    "$interval",
    "$http",
    "AppService",
    "dashBoardService",
    "appConstants"
  ];

  function dashBoardController(
    $rootScope,
    $scope,
    $route,
    $location,
    $timeout,
    $interval,
    $http,
    AppService,
    dashBoardService,
    appConstants
  ) {
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
    _this.future = [];
    _this.past = [];

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
    _this.splitTime = splitTime;
    _this.showAnswer = false;
    //add reminder
    _this.reminderMsg = "";
    _this.reminderPhn = "";
    _this.reminderDate = "";
    _this.reminderTime = "";
    _this.pickDate = pickDate;
    _this.pickTime = pickTime;
    _this.logOut = logOut;
    _this.buttonText = "Login";

    $("#onepush-modal").modal("open");
    function pickDate() {
      $(".datepicker").pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year
        format: "yyyy-mm-dd",
        min: new Date()
      });
    }

    function pickTime() {
      $(".timepicker").pickatime({
        default: "now",
        twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
        donetext: "OK",
        autoclose: false,
        vibrate: true
      });
    }
    function logOut() {
      _this.login = false;
      $("#onepush-modal").modal("open");
      _this.token = "";
    }

    function openLogin() {
      $("#onepush-modal").modal("open");
      _this.isRegister = false;
      _this.buttonText = "Login";
    }

    function openRegister() {
      $("#onepush-modal").modal("open");
      _this.isRegister = true;
      _this.buttonText = "Register";
    }

    function splitDate(date) {
      return date.split("T")[0];
    }

    function splitTime(date) {
      return date.split("T")[1];
    }

    function FormatDate(date) {
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      var dat = date.split("T")[0];
      var day = dat.split("-")[2];
      var year = dat.split("-")[0];
      var mon = parseInt(dat.split("-")[1]);
      var time = date.split("T")[1].split(".")[0];
      return day + " " + monthNames[mon - 1] + " " + year + " At " + time;
    }

    function loginUser() {
        //for Login
      if (_this.isRegister == false) {
        AppService.ShowLoader();
        var promiseObj = dashBoardService.loginUser(
          _this.userName,
          _this.userPwd
        );
        promiseObj.then(
          function success(data) {
            _this.login = true;
            _this.token = data.key;

            console.log(_this.token);
            $("#onepush-modal").modal("close");
            // $('#onepush-modal').closeModal();
            AppService.HideLoader();
            getReminder();
          },
          function error() {
            Materialize.toast("Couldn't login", 4000, "red");
            _this.loginError = true;
            $("#onepush-modal").modal("open");

            AppService.HideLoader();
          }
        );
      }
          //for Registration
      else {
        AppService.ShowLoader();
        var promiseObj = dashBoardService.RegisterUser(
          _this.userEmail,
          _this.userPwd,
          _this.userCnfPwd
        );
        promiseObj.then(
          function success(data) {
            _this.login = true;
            _this.token = data.key;

            console.log(_this.token);
            AppService.HideLoader();
            $("#onepush-modal").modal("close");
            getReminder();
          },
          function error() {
            Materialize.toast(
              "User corresponding to email already exist",
              4000,
              "red "
            );
            AppService.HideLoader();
            $("#onepush-modal").modal("open");

            _this.loginError = true;
          }
        );
      }
    }
//get reminders data
    function getReminder() {
      AppService.ShowLoader();
      var promiseObj = dashBoardService.getReminder(_this.token);
      promiseObj.then(
        function success(data) {
          _this.data = data.remData;
          var today = new Date();
          _this.future = [];
          _this.past = [];
          var dd = today.getDate();
          var mm = today.getMonth() + 1; //January is 0!
          var yyyy = today.getFullYear();
          var obj = {};
          _this.now = yyyy + "-" + mm + "-" + dd;
          var yyyy = today.getFullYear();
          for (var i = 0; i < _this.data.length; i++) {
            var formatDate = _this.FormatDate(_this.data[i].scheduled_datetime);
            obj = {
              id: _this.data[i].id,
              scheduled_datetime: formatDate,
              phone_number: _this.data[i].phone_number,
              message: _this.data[i].message
            };
            if (
              new Date(_this.data[i].scheduled_datetime.split("T")[0]) >
              new Date(_this.now)
            ) {
              _this.future.push(obj);
            } else {
              _this.past.push(obj);
            }
          }

          AppService.HideLoader();
      
        },
        function error() {
          Materialize.toast("Couldn't get reminder data", 4000, "red");
          AppService.HideLoader();
        }
      );
    }
      //add reminder
    function addReminder() {
      var object = {
        scheduled_datetime: $(".datepicker").val() +
          "T" +
          $(".timepicker").val(),

        message: _this.reminderMsg,
        phone_number: _this.reminderPhn,
        token: _this.token
      };
      AppService.ShowLoader();
      var promiseObj = dashBoardService.addReminder(object);
      promiseObj.then(
        function success(data) {
          _this.data = data;
          AppService.HideLoader();
          getReminder(_this.token);
        },
        function error() {
          Materialize.toast("Couldn't add reminder data", 4000, "red");
        }
      );
    }
      //delete reminder
    function deleteReminder(object) {
      var params = {
        id: object.id,
        token: _this.token
      };
      AppService.ShowLoader();
      var promiseObj = dashBoardService.deleteReminder(params);
      promiseObj.then(
        function success(data) {
          _this.data = data;
          AppService.HideLoader();
          getReminder(_this.token);
        },
        function error() {
          Materialize.toast("Couldn't delete reminder data", 4000, "red");
          AppService.HideLoader();
        }
      );
    }

    function editReminder(object) {
      _this.data.map(function(d) {
        if (d.id == object.id) {
          _this.newDate[object.id] = d.scheduled_datetime.split("T")[0];
          _this.newTime[object.id] = d.scheduled_datetime.split("T")[1];
        }
      });
      _this.editable[object.id] = true;
    }
      //edit reminder
    function saveReminder(rem) {
      _this.editable[rem.id] = false;
      var object = {
        scheduled_datetime: _this.newDate[rem.id] + "T" + _this.newTime[rem.id],
        id: rem.id,
        message: rem.message,
        phone_number: rem.phone_number,
        token: _this.token
      };
      AppService.ShowLoader();
      var promiseObj = dashBoardService.saveReminder(object);
      promiseObj.then(
        function success(data) {
          _this.data = data;
          AppService.HideLoader();
          getReminder(_this.token);
        },
        function error() {
          Materialize.toast("Couldn't add reminder data", 4000, "red");
          AppService.HideLoader();
        }
      );
    }

    function cancelReminder(rem) {
      _this.editable[rem.id] = false;
      getReminder(_this.token);
    }
  }
})();
