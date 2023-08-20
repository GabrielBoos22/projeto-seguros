var mongoose = require('mongoose')

const cotacoesSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    iniciovigencia: {
        type: Date,
        required: true
    },
    terminovigencia: {
        type: Date,
        required: true 
    },
    risco: {
        type: Number,
        required: true
    },
    cobertura: {
        type: String,
        required: true
    },
    n_cotacao: {
        type: String,
        required: true
    }
    });

const cotacoes = mongoose.model('cotacoes', cotacoesSchema); 

module.exports = cotacoes;
