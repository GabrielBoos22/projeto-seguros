const jwt = require('jsonwebtoken');
const usuarios = require('../models/usuariosDb');
const bcrypt = require('bcrypt');
const blacklistedTokens = require('../config/blacklist');

module.exports = {
  adiciona: async (req, res) => {
    const { name, username, password, confirmpassword } = req.body;

    // check if user exists
    const userExists = await usuarios.findOne({ username: username });

    if (userExists) {
      return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
    }

    // create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new usuarios({
      name: name,
      username: username,
      password: passwordHash,
    })

    try {
      await user.save();

      res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  }
  ,



  login: async (req, res) => {
    const { username, password } = req.body;

    // check if user exists
    const user = await usuarios.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!", usuarioInvalido: true});
    }

    console.log(user)
  
    try {
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida", senhaInvalida: true });
      }

      const secret = process.env.SECRET
  
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
        { expiresIn: '1h' }
      );
        
      // var NewToken = {
      //   userId: user._id,
      //   userNome: user.name,
      //   token: token
      // }
      res.status(200).json({ msg: "Autenticação realizada com sucesso!", token});
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  },

  lista: async (req, res) => {
    const usuarios = await Usuario.lista();
    res.json(usuarios);
  },

  deleta: async (req, res) => {
    const usuario = await Usuario.buscaPorId(req.params.id);
    try {
      await usuario.deleta();
      res.status(200).send();
    } catch (erro) {
      res.status(500).json({ erro: erro });
    }
  },

  buscaPorId: async (req, res) => {
    const id = req.params.id;
  
    // check if user exists
    const user = await usuarios.findById(id, "-password");
  
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
  
    res.status(200).json({ user });
  },

  logout: (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    // adicionar o token JWT atual na lista negra
    blacklistedTokens.push(token);
  
    res.status(200).send('Logout realizado com sucesso');
  }
};  

