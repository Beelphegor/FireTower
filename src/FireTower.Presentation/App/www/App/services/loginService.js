﻿angular.module('firetower')
    .service('loginService', ['$q', '$http', function ($q, $http) {
        //var baseUrl = 'http://firetowerapidev.apphb.com/';
        var baseUrl = '';
        return {
            authenticate: function (email, password) {
                return $http.post(baseUrl + "/login", { email: email, password: password });
            }
        };
    }]);