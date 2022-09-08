const { response } = require('express');
const express = require('express');
const controllerUsuario = require('./controllers/UsuarioController.js');

const routes = express.Router();

routes.get('/', (req, res) => {
 res.json({'Status': 'UP'});   
});

routes.get('/usuarios', controllerUsuario.List);

routes.post('/usuarios', controllerUsuario.Create);

routes.post('/usuarios/:id', controllerUsuario.Update);

// routes.get('/GetOne', controllerUsuario.GetOne);
routes.post('/GetOne', controllerUsuario.GetOne); // MUDAMOS PARA POST

routes.post('/Delete', controllerUsuario.Delete);

module.exports = routes;
