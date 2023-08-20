angular.module('seguro').controller("PropostaController", function ($scope, $routeParams, $http, $location, $window) {

    if (!$routeParams.propostaId) $location.path("/lista")

    const token = localStorage.getItem('token');
    $http.defaults.headers.common.Authorization = 'Bearer ' + token;



    $http.get('/proposta/' + $routeParams.propostaId)
        .then((proposta) => {
            $scope.proposta = proposta.data;
            $scope.proposta.valorpago = Math.floor(0.05 * $scope.proposta.risco);
            $scope.proposta.n_proposta = proposta.data.n_proposta;
            $scope.proposta.iniciovigencia = new Date($scope.proposta.iniciovigencia);
            $scope.proposta.terminovigencia = new Date($scope.proposta.terminovigencia);
        }).catch((error) => {
            console.log(error)
            $window.location.href = "http://localhost:3000/#/login";
        });

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

    $scope.elaborarApolice = function () {
        const novaApolice = angular.copy($scope.proposta)
        novaApolice.n_apolice = $scope.proposta.n_proposta;
        delete novaApolice.n_proposta
        novaApolice._id = $routeParams.propostaId
        $http.post('/apolice', novaApolice)
            .then(function (response) {
                console.log(response);
                $location.path("/apolice/" + $routeParams.propostaId)
            })
            .catch(function (error) {
                console.log(error);
                $location.path("/apolice/" + $routeParams.propostaId)
            });
    }
})