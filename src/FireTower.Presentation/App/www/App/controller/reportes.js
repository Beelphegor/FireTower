angular.module('firetower')
    .controller('ReportesController', ['$scope', '$ionicLoading', 'data', 'Math', function ($scope, $ionicLoading, data, Math) {
        var getAllReports = function () {
            $scope.loading = $ionicLoading.show({
                content: 'Cargando datos de incendios...',
                showBackdrop: false
            });
            
            data.getAllReports()
                .success(function(data) {
                    $scope.reportes = data;
                    for (var i = 0; i < $scope.reportes.length; i++) {
                        var formattedDate = $scope.reportes[i].CreatedDate.$date;
                        formattedDate = moment((new Date()).toLocaleDateString()).fromNow();
                        $scope.reportes[i].CreatedDate.$date = formattedDate;
                        $scope.reportes[i].SeverityAverage = Math.Average($scope.reportes[i].SeverityVotes);
                    }
                    
                    $scope.loading.hide();
                })
                .error(function(error) {

                });
        };
        
        $scope.reportes = null;
        getAllReports();
    }]);