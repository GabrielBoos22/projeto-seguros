const UsuarioApiController = require('../controlador/usuario-controlador')
const middlewaresAutenticacao = require('../config/middleware-autenticacao')
// const CoberturaApiController = require('../models/coberturaDao')

module.exports = (app) => {

    app.route('/usuario/login')
    .post( UsuarioApiController.login)

    app.route('/usuario/registra')
    .post(UsuarioApiController.adiciona)
    
    app.route('/user/:id')
    .get(middlewaresAutenticacao.local, UsuarioApiController.buscaPorId)

    app.route('/logout')
    .post(UsuarioApiController.logout)

}