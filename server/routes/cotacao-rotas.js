const CotacaoApiController = require('../infra/cotacaoDao')
const CoberturaApiController = require('../infra/coberturaDao')
const middlewaresAutenticacao = require('../config/middleware-autenticacao')

module.exports = (app) => {
    app.route('/lista')
        .post(middlewaresAutenticacao.local, CotacaoApiController.adiciona)
        .get(middlewaresAutenticacao.local, CotacaoApiController.lista)
    
    app.route('/lista/:id')
        .delete(CotacaoApiController.excluiPorId)
        .get(CotacaoApiController.listaPorId)
        .put(middlewaresAutenticacao.local, CotacaoApiController.edita)

        app.route('/listar/:cpf')
        .get(CotacaoApiController.listaPorCpf)        
}