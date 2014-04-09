﻿angular.module('firetower')
    .factory('DisasterService', ['$http', function ($http) {
        var factory = {};

        factory.SaveSeverity = function (severity) {
            return $http.post('/votes/severity', severity);
        };
        
        factory.VoteControlled = function (isControlled) {
            return $http.post('/votes/controlled', isControlled);
        };
        
        factory.VotePutOut = function (putOutRequest) {
            return $http.post('/votes/putout', putOutRequest);
        };

        factory.CreateDisaster = function (newDisaster) {
            var token = localStorage.getItem('firetowertoken');
            newDisaster.token = token;
            return $http.post('/Disasters', newDisaster);
        };

        factory.SaveImageToDisaster = function (disasterId, base64Image) {
            var token = localStorage.getItem('firetowertoken');
            base64Image.token = token;
            return $http.post('/disasters/'+ disasterId +'/image', base64Image);
        };

        return factory;
}]);