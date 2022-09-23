const { response } = require('express');
const express = require('express');
const controllerUsuario = require('./controllers/usuarioController.js');
const controllerInstituicao = require('./controllers/instituicaoController.js');

const routes = express.Router();

routes.get('/', (req, res) => {
 res.json({'Status': 'UP'});   
});

routes.get('/usuarios', controllerUsuario.List);
routes.get('/usuarios/:id', controllerUsuario.GetOne);
routes.post('/usuarios', controllerUsuario.Create);
routes.put('/usuarios/:id', controllerUsuario.Update);
routes.delete('/usuarios/:id', controllerUsuario.Delete);
routes.post('/login', controllerUsuario.Login);

routes.get('/instituicoes', controllerInstituicao.List);
routes.get('/instituicoes/:id', controllerInstituicao.GetOne);
routes.post('/instituicoes', controllerInstituicao.Create);
routes.put('/instituicoes/:id', controllerInstituicao.Update);
routes.delete('/instituicoes/:id', controllerUsuario.Delete);

module.exports = routes;
