angular.module('firetower', ['ionic', 'google-maps'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: "/app",
            templateUrl: "App/views/menu.html",
            controller: "MenuController"
        })
        .state('app.inicio', {
            url: "/inicio",
            views: {
                'menuContent': {
                    templateUrl: "App/views/inicio.html"
                }
            }
        })
        .state('app.reportes', {
            url: "/reportes",
            views: {
                'menuContent': {
                    templateUrl: "App/views/reportes.html",
                    controller: 'ReportesController'
                }
            }
        })
        .state('app.reporte', {
            url: "/reporte/:reporteId",
            views: {
                'menuContent': {
                    templateUrl: "App/views/reporte.html",
                    controller: 'ReporteController'
                }
            }
        })
        .state('otherwise', {
            url: '*path',
            templateUrl: 'App/views/login.html',
            controller: 'LoginController'
        });
    //$urlRouterProvider.otherwise('/app/inicio');

    var myAppId = '294203754077185';
    
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    
    
    if (isMobile.any()) {
        FB.init({ appId: myAppId, nativeInterface: CDV.FB, useCachedDialogs: false });
    } else {
        FB.init({ appId: myAppId});
    }
}]);
