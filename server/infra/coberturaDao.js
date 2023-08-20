var Coberturas = require('../models/CoberturaDb');


class CoberturaApiController {

    static listaCobertura = (req, res) => {
        Coberturas.find()
        .lean()
        .then((coberturas) => {
            res.status(200).json(coberturas)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send(err);
        })
    }
}
module.exports = CoberturaApiController;
