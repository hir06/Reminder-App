(function () {
    "use strict";
    angular.module('myApp.workDetail.controller', [])
            .controller('workDetailController', workDetailController);

    workDetailController.$inject = ['$rootScope', '$scope', '$route', '$routeParams','$location', '$timeout', '$interval', 'myAppService', '$http', '$q', 'appConstants'];

    function workDetailController($rootScope, $scope, $route, $routeParams,$location, $timeout, $interval, myAppService, $http, $q, appConstants) {
       


        var _this = this;
        _this.hover = false;
        _this.LayoutClass = 'grid';
        _this.query = "";
   
        _this.fetchProjectDetails = fetchProjectDetails;
        _this.showRightImage = showRightImage;
        _this.imagError = imagError;
        _this.showLeftImage = showLeftImage;
        function fetchProjectDetails() {
            var promiseObj = myAppService.fetchProjectDetails();
            promiseObj.then(function success(data) {
                
                    _this.projectData = data.projectData;
                    //_this.imageCount = [];
                    //for (var i = 0; i < 5; i++) {
                    //    _this.imageCount.push({index:i+1})
                    //}

                    _this.projectName = $routeParams.projectName;
                    for (var i = 0; i < _this.projectData.length; i++) {
                        if (_this.projectData[i].name == _this.projectName) {
                            _this.projectDetail = _this.projectData[i];
                        }
                    }
                //_this.projectDetail=
                    //_this.projectName.replace('', '%20');
            },
            function error() {
                Materialize.toast("Couldn't load projectData!", 4000, "red")
            });
        }

      
        function showRightImage(object) {
            var imageIndex = object.target.previousElementSibling.src.split("/").pop(-1).split('.')[0];
            imageIndex++;
            var imageUrl = object.target.previousElementSibling.src;
            var temp = imageUrl.split(".")[0].replace(/\d+$/, imageIndex) + ".png";
            //imageUrl = temp.replace(/\d+$/, imageIndex++);
            //imageUrl=imageUrl+ ".png"
            $('#workImage').attr('src', temp);
           

        }
        function getFoldersize() {

        }
        function showLeftImage(object) {
            var imageIndex = object.target.previousElementSibling.src.split("/").pop(-1).split('.')[0];
            imageIndex++;
            var imageUrl = object.target.previousElementSibling.src;
            var temp = imageUrl.split(".")[0].replace(/\d+$/, imageIndex) + ".png";
            //imageUrl = temp.replace(/\d+$/, imageIndex++);
            //imageUrl=imageUrl+ ".png"
            $('#workImage').attr('src', temp);


        }
        function imagError(object) {
            $('#workImage').attr('src', 'src');
        }


        fetchProjectDetails();

    }

})();