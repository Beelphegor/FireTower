﻿angular.module('firetower')
    .factory('PictureService', ['$q', function($q) {
        
        var defaultPictureWithoutDataType =
             "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";        
        
        return {
            init: function () {
                if (!navigator.camera) {
                    alert("No camera!");
                    navigator.camera = {
                        PictureSourceType: { CAMERA: "CAMERA" },
                        DestinationType: { DATA_URL: "DATA_URL" },
                        getPicture: function (successCallback) {
                            alert("Simulating the camera. Will return a default image.");
                            successCallback(defaultPictureWithoutDataType);
                        }
                    };
                }                
            },
            takePicture: function () {
                var def = $q.defer();

                var dataUrl = navigator.camera.DestinationType.DATA_URL;
                var camera = navigator.camera.PictureSourceType.CAMERA;
                
                var options = {
                    quality: 50,
                    destinationType: dataUrl,
                    sourceType: camera,
                    encodingType: 0
                };

                alert("PictureService: getting picture");
                navigator.camera.getPicture(
                    function (base64) {
                        alert("PictureService: got picture");
                        def.resolve({
                            base64: base64,
                            imageUrl: "data:image/jpeg;base64," + base64
                        });
                    },
                    function (err) {
                        alert("There was an error when taking a photo with the device's camera. " + err);
                        def.reject(err);
                    },
                    options);

                return def.promise;
            }
        };
    }]);