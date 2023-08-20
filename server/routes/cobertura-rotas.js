const CoberturaApiController = require('../infra/coberturaDao')

module.exports = (app) => {
    app.route('/coberturas')
    .get(CoberturaApiController.listaCobertura)
}