const { response } = require('express');
const express = require('express');
const controllerUsuario = require('./controllers/usuarioController.js');
const controllerInstituicao = require('./controllers/instituicaoController.js');
const controllerPostagem = require('./controllers/postagemController.js');
const controllerAgenda = require('./controllers/agendaController.js');
const jwt = require('jsonwebtoken');

const routes = express.Router();

routes.get('/', (req, res) => {
 res.json({'Status': 'UP'});   
});

function verificaJWTUsuario(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET_USUARIO, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Usuario não autenticado"});
        next();
    })
};

function verificaJWTInstituicao(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET_INSTITUICAO, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Instituicao não autenticada"});
        next();
    })
};

routes.get('/v1/api/usuarios',verificaJWTUsuario, controllerUsuario.List);
routes.get('/v1/api/usuarios/:id', controllerUsuario.GetOne);
routes.post('/v1/api/usuarios', controllerUsuario.Create);
routes.put('/v1/api/usuarios/:id', controllerUsuario.Update);
routes.delete('/v1/api/usuarios/:id', controllerUsuario.Delete);
routes.post('/v1/api/usuarios/login', controllerUsuario.loginUsuario);

routes.get('/v1/api/instituicoes', controllerInstituicao.List);
routes.get('/v1/api/instituicoes/:id', controllerInstituicao.GetOne);
routes.post('/v1/api/instituicoes', controllerInstituicao.Create);
routes.put('/v1/api/instituicoes/:id', controllerInstituicao.Update);
routes.delete('/v1/api/instituicoes/:id', controllerInstituicao.Delete);
routes.post('/v1/api/instituicoes/login', controllerInstituicao.loginInstituicao);

routes.get('/v1/api/postagens/', controllerPostagem.List); 
routes.get('/v1/api/postagens/:id', controllerPostagem.GetOne);
routes.post('/v1/api/postagens/', verificaJWTInstituicao, controllerPostagem.Create);
routes.put('/v1/api/postagens/:id', verificaJWTInstituicao, controllerPostagem.Update);

routes.get('/v1/api/agendamentos/', controllerAgenda.List);
routes.post('/v1/api/agendamentos/', controllerAgenda.Agendar);


module.exports = routes;
