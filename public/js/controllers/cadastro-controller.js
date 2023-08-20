angular.module('seguro').controller("CadastroController", function ($scope, $http, $routeParams, $location, $window) {

  var data = new Date();
  var dataMais1 = new Date(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate() + 1);

  const token = localStorage.getItem('token');
  $http.defaults.headers.common.Authorization = 'Bearer ' + token;

  $scope.cotacao = {
    iniciovigencia: dataMais1,
    n_cotacao: __getProximoNumero()
  };

  $scope.cpfErro = false;
  $scope.dataErro = false;
  $scope.mensagem = '';

  $scope.submeter = function () {
    if ($routeParams.cotacaoId) {
      validaFormularioEditado()
      // PUT
      $http.put('/lista/' + $routeParams.cotacaoId, $scope.cotacao)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
          $window.location.href = "http://localhost:3000/#/login";
        });

    } else {
      validaFormulario()
        .then(valido => {
          if (valido) {
            $location.path("/lista");
          }
        });
    }
  }

  $scope.voltar = function () {
    $scope.cotacao.n_cotacao = __getAntigoNumero();
  }

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


  $scope.elaborarProposta = function () {
    if ($routeParams.cotacaoId) {
      validaFormularioEditado()
      __getAntigoNumero()
      const novaProposta = angular.copy($scope.cotacao)
      novaProposta.n_proposta = $scope.cotacao.n_cotacao;
      delete novaProposta.n_cotacao
      novaProposta._id = $routeParams.cotacaoId
      $http.post('/proposta/', novaProposta)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      $location.path("/proposta/" + $routeParams.cotacaoId)
    } else {
      validaFormulario()
        .then((response) => {
          if (response) {

            buscaIdCotacao()
              .then((response) => {
                if (response) {
                  const novaProposta = angular.copy($scope.cotacao)
                  novaProposta._id = response._id
                  novaProposta.n_proposta = $scope.cotacao.n_cotacao
                  delete novaProposta.n_cotacao
                  $http.post('/proposta', novaProposta)
                    .then(function (response) {
                      console.log(response);
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                  $location.path("/proposta/" + novaProposta._id)
                }
              })
          }
        })

    }
  }

  function validaFormulario() {
    let valido = false;

    if ($scope.formulario.$valid) {
      return validaCPF($http, $scope.cotacao.cpf)
        .then(result => {
          if (result) {
            $scope.cpfErro = true;
          } else {
            if (validaData($scope.cotacao.terminovigencia, $scope.cotacao.iniciovigencia)) {
              console.log("Data Inválida");
              $scope.dataErro = true;
            } else {
              $http.post('/lista', $scope.cotacao)
                .then(function (response) {
                  // Sucesso - fazer algo com a resposta
                  console.log(response);
                })
                .catch(function (error) {
                  // Erro - lidar com o erro
                  console.log(error);
                  $window.location.href = "http://localhost:3000/#/login";
                });

              $scope.formulario.$setUntouched();
              $scope.mensagem = 'A cotação foi cadastrada com sucesso'
              valido = true;

            }
          }
          return valido
        });
    } else {
      return Promise.resolve(valido);
    }

  }

  function buscaIdCotacao() {
    return new Promise(function (resolve, reject) {
      $http.get('/listar/' + $scope.cotacao.cpf)
        .then(function (cotacoes) {
          if (cotacoes.data) {
            resolve(cotacoes.data);
          } else {
            resolve(false);
          }
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  function validaFormularioEditado() {
    let valido = false;

    if ($scope.formulario.$valid) {

      if (validaData($scope.cotacao.terminovigencia, $scope.cotacao.iniciovigencia)) {
        console.log("Data Inválida");
        $scope.dataErro = true;

      } else {

        $scope.formulario.$setUntouched();
        $scope.mensagem = 'A cotação foi editada com sucesso'
        valido = true

      }
    }
    return valido
  }

  if ($routeParams.cotacaoId) {
    // GET
    $http.get('/lista/' + $routeParams.cotacaoId, $scope.cotacao)
      .then(function (cotacoes) {
        $scope.cotacao = cotacoes.data;
        $scope.cotacao.iniciovigencia = new Date($scope.cotacao.iniciovigencia);
        $scope.cotacao.terminovigencia = new Date($scope.cotacao.terminovigencia);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

})