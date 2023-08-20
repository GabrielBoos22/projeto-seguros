var cotacoes = require('../models/CotacaoDb');


class CotacaoApiController {
    static adiciona = (req, res) => {
        var cotacao = new cotacoes(req.body);     

        cotacao.save()
            .then(() => {
                res.status(201).send(cotacao)
            })
            .catch((err) => {
                res.status(500).send({ message: `${err.message} - falha ao cadastrar cotacao.` })
            });
    };

    static lista = (req, res) => {
        cotacoes.find()
        .then((cotacoes) => {
            res.status(200).json(cotacoes)
        })
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao listar cotacao.` })
        }) 
    }

    static excluiPorId = (req, res) => {
        const id = req.params.id
        cotacoes.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({message: 'Cotacao removida com sucesso'})
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
    }

    static listaPorId = (req, res) => {
        const id = req.params.id
        cotacoes.findById(id)
        .then((cotacoes) => {
            res.status(200).send(cotacoes)
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
    }

    static edita = (req, res) => {
        const id = req.params.id;

        cotacoes.findByIdAndUpdate(id, {$set: req.body})
        .then((cotacoes) => {
            res.status(200).send(cotacoes)
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
    }

    static listaPorCpf = (req, res) => {
        const cpfRecebido = req.params.cpf

        cotacoes.findOne({cpf: cpfRecebido})
        .then((cotacoes) => {
            res.status(200).send(cotacoes)
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
    }


}


module.exports = CotacaoApiController;

