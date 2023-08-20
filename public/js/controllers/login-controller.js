angular.module('seguro').controller("LoginController", function ($scope, $http, $location) {

  $scope.usuarioErro = false;
  $scope.senhaErro = false;

  $scope.submeter = function () {
    $http.post('/usuario/login', $scope.login)
      .then(function (response) {
        localStorage.setItem('token', response.data.token)
        console.log(response)
        $location.path("/lista/")
      })
      .catch(function (error) {
        console.log(error);
        if(error.data.usuarioInvalido){
          $scope.usuarioErro = true;
        } else if(error.data.senhaInvalida){
          $scope.senhaErro = true;
        }
        
      });
  }

})
