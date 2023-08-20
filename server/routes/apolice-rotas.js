const ApoliceApiController = require('../infra/apoliceDao')
const middlewaresAutenticacao = require('../config/middleware-autenticacao')


module.exports = (app) => {
    app.route('/apolice')
        .post(middlewaresAutenticacao.local, ApoliceApiController.adiciona)
        .get(middlewaresAutenticacao.local, ApoliceApiController.lista)

    app.route('/apolice/:id')
    .delete(middlewaresAutenticacao.local,ApoliceApiController.excluiPorId)
    .get(ApoliceApiController.listaPorId)   
}
