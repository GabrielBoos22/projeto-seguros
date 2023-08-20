require('dotenv').config();
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var routes = require('../routes');
const db = require('./database')

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

app.use(express.json());
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

module.exports = app;