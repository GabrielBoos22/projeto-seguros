angular.module('seguro').controller("ApoliceController", function ($scope, $http, $routeParams, $location, $window) {

    if (!$routeParams.apoliceId) $location.path("/lista")

    const token = localStorage.getItem('token');
    $http.defaults.headers.common.Authorization = 'Bearer ' + token;

    $scope.logout = function () {
        $http.post('/logout')
                    .then(function (response) {
                      console.log(response);
                    })
                    .catch(function (error) {
                      // Erro - lidar com o erro
                      console.log(error);
                      $window.location.href = "http://localhost:3000/#/login";
                    });
      }

    const listaApolice = new storage("apolices")
    // $scope.apolices = listaApolice.listObjects()
    $http.get('/apolice/')
        .then((apolice) => {
            console.log(apolice)
            $scope.apolices = apolice.data
        }).catch((error) => {
            console.log(error)
            $window.location.href = "http://localhost:3000/#/login";
        });


})