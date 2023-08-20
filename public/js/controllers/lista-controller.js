angular.module('seguro').controller("ListaController", function ($scope, $http, $location, $window) {
    $scope.filtro = '';
    $scope.mensagem = '';
    const usuariosStore = new storage("usuarios")

    const token = localStorage.getItem('token');
    $http.defaults.headers.common.Authorization = 'Bearer ' + token;

          
    $http.get('/lista')
        .success(function (cotacoes) {
            $scope.cotacoes = cotacoes;
        })
        .error(function (erro) {
            console.log(erro.redirect);
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


    $scope.remover = function (cotacao) {

        $http.delete('/apolice/' + cotacao._id)
        .then((response) => {
            if(response){
                $http.delete('/proposta/' + cotacao._id)
                .then((response) => {
                    if (response) {
                        $http.delete('/lista/' + cotacao._id)
                            .then((response) => {
                                $http.get('/lista')
                                .success(function (cotacoes) {
                                    $scope.cotacoes = cotacoes;
                                })
                                .error(function (erro) {
                                    console.log(erro.redirect);
                                    $window.location.href = "http://localhost:3000/#/login";
                                });
                            })
                            .catch(function (erro) {
                                console.log(erro);
                            });
                    }
                })
                .catch(function (erro) {
                    console.log(erro);
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
            $window.location.href = "http://localhost:3000/#/login";
        });
        

        $scope.mensagem = "A cotação foi deletada com sucesso"

    }

})