﻿angular.module('firetower')
    .controller('ReporteController', ['$scope', '$stateParams', '$ionicLoading', 'data', 'Math', 'DisasterService',
        function ($scope, $stateParams, $ionicLoading, data, Math, DisasterService) {

        $scope.startCount = 5;

        $scope.test = function() {
            alert('');
        };

        $scope.filedStars = [];
        $scope.blankStars = [];
        $scope.Severities = [1, 2, 3, 4, 5];

        var getArray = function (n, startingNumber) {
            var arr = [];
            for (var i = 0; i < n; i++)
                arr.push(startingNumber++);
            return arr;
        };

        $scope.saveSeverity = function (severityScore) {
            DisasterService.SaveSeverity({
                DisasterId: $stateParams.reporteId,
                Severity: severityScore
            })
                .success(function (response) {
                    alert(response);
                })
                .error(function (error) {
                    alert(error);
                });
        };

        var init = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Cargando datos del incendio...',
                showBackdrop: false
            });
            
            data.getReportById($stateParams.reporteId)
                .success(function(data) {
                    data = data[0];
                    var formattedDate = data.CreatedDate.$date;
                    formattedDate = moment((new Date()).toLocaleDateString()).fromNow();
                    data.CreatedDate.$date = formattedDate;
                    data.SeverityAverage = Math.Average(data.SeverityVotes);

                    $scope.filedStars = getArray(data.SeverityAverage,1);
                    $scope.blankStars = getArray(5 - data.SeverityAverage, 1+data.SeverityAverage);

                    $scope.reporte = data;

                    $scope.map = {
                        center: {
                            latitude: data.Location[0],
                            longitude: data.Location[1]
                        },
                        zoom: 12,
                        refresh: true
                    };
                    $scope.loading.hide();
                })
                .error(function(error) {
                    console.log(error);
                });
            
            $scope.map = {
                center: {
                    latitude: 0,
                    longitude: 1
                },
                zoom: 12,
                refresh: false
            };
        };
        $scope.reporte = null;
        $scope.isControlled = false;
        $scope.updateControlledFire = function () {
            if ($scope.isControlled)
                $scope.isControlled = false;
            else
                $scope.isControlled = true;

            DisasterService.VoteControlled({ DisasterId: $stateParams.reporteId, IsControlled: $scope.isControlled })
                .success(function(response) {
                    console.log(response);
                })
                .error(function(response) {
                    console.log(response);
                });
            
            console.log($scope.isControlled);

        };
        $scope.updatePutOutFire = function () {
            console.log("asd");
        };
        init();        
    }]);