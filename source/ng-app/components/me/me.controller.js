(function () {
    "use strict";
    angular.module('myApp.me.controller', [])
            .controller('meController', meController);

    meController.$inject = ['$timeout', '$scope', 'meService', 'appConstants'];

    function meController($timeout, $scope, meService, appConstants) {



        var _this = this;
        _this.changePos = changePos;
        function changePos() {
            alert('here');
        }
    }
})();