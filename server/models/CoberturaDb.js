const mongoose = require('mongoose');

const coberturaSchema = new mongoose.Schema(
    {
        nome: {type: String, required: true}
    },
    {
        versionKey: false
    }
)

const coberturas = mongoose.model("coberturas", coberturaSchema);

module.exports = coberturas;