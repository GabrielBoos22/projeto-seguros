angular.module('seguro', ['ngRoute', 'ngAnimate'])
.config(function($routeProvider ) {
    
    $routeProvider.when('/lista', {
        templateUrl: 'js/partials/principal.html',
        controller: 'ListaController'
    });

    $routeProvider.when('/cotacoes/new', {
        templateUrl: 'js/partials/cotacoes.html',
        controller: 'CadastroController'
    });

    $routeProvider.when('/cotacoes/edit/:cotacaoId', {
        templateUrl: 'js/partials/cotacoes.html',
        controller: 'CadastroController'
    });

    $routeProvider.when('/proposta/:propostaId', {
        templateUrl: 'js/partials/proposta.html',
        controller: 'PropostaController'
    });

    $routeProvider.when('/apolice/:apoliceId', {
        templateUrl: 'js/partials/apolice.html',
        controller: 'ApoliceController'
    });

    $routeProvider.when('/login', {
        templateUrl: 'js/partials/login.html',
        controller: 'LoginController'
    });


    $routeProvider.otherwise({ redirectTo: '/lista'});

});     