var mongoose = require('mongoose')
const { ObjectId } = require('mongodb');

const apolicesSchema = new mongoose.Schema({
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
    n_apolice: {
        type: String,
        required: true
    },
    pagamento: {
        type: String,
        required: true
    },
    valorpago: {
        type: String,
        required: true
    },
    proposta: {
        type: ObjectId,
        ref: "propostas"
    },
    hashApolice: {
        type: String,
        required: true
    }
    });

const apolices = mongoose.model('apolices', apolicesSchema); 

module.exports = apolices;