const CotacaoRotas = require('./cotacao-rotas');
const UsuarioRotas = require('./usuario-rotas')
const CoberturaRotas = require('./cobertura-rotas')
const PropostasRotas = require('./propostas-rotas')
const ApolicesRotas = require('./apolice-rotas')

module.exports = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Curso de node"})
      })

    CotacaoRotas(app);
    UsuarioRotas(app);
    CoberturaRotas(app);
    PropostasRotas(app);
    ApolicesRotas(app);
};