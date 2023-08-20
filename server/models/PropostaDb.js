var mongoose = require('mongoose')
const { ObjectId } = require('mongodb');


const propostasSchema = new mongoose.Schema({
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
    n_proposta: {
        type: String,
        required: true
    },
    cotacao: {
        type: ObjectId,
        ref: "cotacoes"
      }
    });

const propostas = mongoose.model('propostas', propostasSchema); 

module.exports = propostas;