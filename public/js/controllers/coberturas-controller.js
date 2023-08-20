angular.module('seguro').controller("CoberturasController", function($scope, $http){

    $http.get('/coberturas')
    .then((coberturas) => {
      $scope.coberturas = coberturas.data
    }).catch(function (error) {
      console.log(error);
    });
    
});