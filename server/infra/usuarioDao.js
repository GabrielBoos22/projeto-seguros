const { InternalServerError } = require('../erros');

var usuarios = require('../models/usuariosDb');


class UsuarioApiController {
    static adiciona = (req, res) => {
        var usuario = new usuarios(req.body);     

        usuario.save()
            .then((usuario) => {
                res.status(201).send(usuario)
            })
            .catch((err) => {
                res.status(500).send({ message: `${err.message} - falha ao cadastrar usuário.` })
            });
    };

    static lista = (req, res) => {
        usuarios.find()
        .then((usuarios) => {
            res.status(200).json(usuarios)
        })
        .catch((err) => {
            res.status(500).send({ message: `${err.message} - falha ao listar usuario.` })
        }) 
    }

    static deleta = (req, res) => {
        const id = req.params.id
        usuarios.findByIdAndDelete(id)
        .then(() => {
            res.status(200).send({message: 'Usuario removido com sucesso'})
        })
        .catch((err) => {
            res.status(500).send({message: err.message})
        })
    }

    static buscaPorUsername = (req, res) => {

        usuarios.find({username: "123"})
        .then((usuario) => {
            res.send(usuario)
        })
    
    }

}


module.exports = UsuarioApiController;