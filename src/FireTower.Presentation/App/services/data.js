﻿angular.module('firetower')
    .factory('data', ['$http', function ($http) {
    var factory = {};

    var apiKey = 'Edc1w2R7eTgTWs5fUOrbiI8-xkDkPznM';        
    var baseUrl = 'https://api.mongolab.com/api/1/databases/';
    var db = 'appharbor_ab50c767-930d-4b7d-9571-dd2a0b62d5a9';
    var collection = 'DisasterViewModel';
        
    factory.getAllReports = function() {
        return [
            {
                "_id": {
                    "$oid": "123aasd32"
                },
                "CreatedDate": "hace 20 minutos",
                "LocationDescription": "Near Comayagua",
                "Location": [0.45234234, 0.01231234],
                "SeverityNotes": [2],
                "Images": ['http://placehold.it/350x150', 'http://ww4.hdnux.com/photos/12/72/01/2859127/13/628x471.jpg']
            },
            {
                "_id": {
                    "$oid": "123aasd32"
                },
                "CreatedDate": "hace 20 minutos",
                "LocationDescription": "Near Comayagua",
                "Location": [0.45234234, 0.01231234],
                "SeverityNotes": [2],
                "Images": ['http://placehold.it/350x150', 'https://www.dosomething.org/files/styles/blog_landscape/public/pictures/wildfires8763.jpg?itok=VxL9mcG7']
            },
            {
                "_id": {
                    "$oid": "123aasd32"
                },
                "CreatedDate": "hace 20 minutos",
                "LocationDescription": "Near Comayagua",
                "Location": [0.45234234, 0.01231234],
                "SeverityNotes": [2],
                "Images": ['http://placehold.it/350x150', 'http://placehold.it/350x450']
            }
        ];
        /*var url = baseUrl + db + '/collections/' + collection + '?apiKey=' + apiKey;
        console.log(url);
        return $http.get(url);
*/
    };

    factory.getReportById = function(id) {
        var query = '?q={"_id":{"$oid": "' + id + '"}}';
        return $http.get(baseUrl + db + '/collections/' + collection + query +'?apiKey=' + apiKey);
    };

    return factory;
}]);