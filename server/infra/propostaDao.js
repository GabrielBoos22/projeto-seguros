var propostas = require('../models/PropostaDb');
const { ObjectId } = require('mongodb');

class PropostaApiController {
    static adiciona = (req, res) => {  
        var proposta = new propostas(req.body);

        proposta.save()
            .then(() => {
                res.status(201).send(proposta)
            })
            .catch((err) => {
                res.status(500).send({ message: `${err.message} - falha ao cadastrar proposta.` })
            });
    };

    static lista = (req, res) => {
        propostas.find()
            .then((propostas) => {
                res.status(200).json(propostas)
            })
            .catch((err) => {
                res.status(500).send({ message: `${err.message} - falha ao listar proposta.` })
            })
    }

    static excluiPorId = (req, res) => {
        const id = req.params.id
        propostas.findByIdAndDelete(id)
            .then(() => {
                res.status(200).send({ message: 'Proposta removida com sucesso' })
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })
    }

    static listaPorId = (req, res) => {
        const id = req.params.id
        propostas.findById(id)
            .then((proposta) => {
                res.status(200).send(proposta)
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })
    }

    static buscaPorCpf = (req, res) => {
        const cpfRecebido = req.params.cpf
        propostas.findOne({ cpf: cpfRecebido })
            .then((proposta) => {
                res.status(200).send(proposta)
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })
    }

    static edita = (req, res) => {
        const id = req.params.id;

        propostas.findByIdAndUpdate(id, { $set: req.body })
            .then((proposta) => {
                res.status(200).send(proposta)
            })
            .catch((err) => {
                res.status(500).send({ message: err.message })
            })
    }
}


module.exports = PropostaApiController;
