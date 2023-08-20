const PropostaApiController = require('../infra/propostaDao')
const middlewaresAutenticacao = require('../config/middleware-autenticacao')

module.exports = (app) => {
    app.route('/proposta')
        .post(middlewaresAutenticacao.local, PropostaApiController.adiciona)


    app.route('/proposta/:id')
    .delete(PropostaApiController.excluiPorId)
    .get(middlewaresAutenticacao.local, PropostaApiController.listaPorId)
    .put(PropostaApiController.edita)
    
    app.route('/proposta/busca/:cpf')
    .get(PropostaApiController.buscaPorCpf)
}
