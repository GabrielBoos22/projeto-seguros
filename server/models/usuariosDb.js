var mongoose = require('mongoose')

const usuariosSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
    type: String,
    required: true
    },
    password: {
        type: String,
        required: true
    }
    });

const usuarios = mongoose.model('usuarios', usuariosSchema); 

module.exports = usuarios;