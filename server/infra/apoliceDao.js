var apolices = require('../models/ApoliceDb');
const bcrypt = require('bcrypt');

class ApoliceApiController {
    static adiciona = (req, res) => {
        var apolice = new apolices(req.body); 
        
        const stringParaHash = apolice.iniciovigencia.toString() + apolice.nome + apolice.cpf +
                               apolice.terminovigencia.toString() + apolice.risco.toString() +
                               apolice.valorpago.toString() + apolice.cobertura + apolice.n_apolice + apolice.pagamento + apolice.proposta

        const hashApolice = bcrypt.hash(stringParaHash, 10)
        .then((hash) => {
            apolice.hashApolice = hash;
            apolice.save()
            .then(() => {
                res.status(201).send(apolice)
            })
            .catch((err) => {
                res.status(500).send({ message: `${err.message} - falha ao cadastrar apolice.` })
            });
        })

    };

    static lista = (req, res) => {
        apolices.find()
        .then((apolices) => {
            res.status(200).json(apolices)
        })
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao listar apolice.` })
        }) 
    }


    static listaPorId = (req, res) => {
        const id = req.params.id
        apolices.findById(id)
        .then((apolice) => {
            res.status(200).send(apolice)
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
    }

    static edita = (req, res) => {
        const id = req.params.id;

        apolices.findByIdAndUpdate(id, {$set: req.body})
        .then((apolice) => {
            res.status(200).send(apolice)
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
    }

    static excluiPorId = (req, res) => {
        const id = req.params.id
        apolices.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({message: 'Apolice removida com sucesso'})
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
    }
}


module.exports = ApoliceApiController;
