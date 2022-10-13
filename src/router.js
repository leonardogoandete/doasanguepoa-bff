const { response } = require('express');
const express = require('express');
const controllerUsuario = require('./controllers/usuarioController.js');
const controllerInstituicao = require('./controllers/instituicaoController.js');
const controllerPostagem = require('./controllers/postagemController.js');
const jwt = require('jsonwebtoken');

const routes = express.Router();

routes.get('/', (req, res) => {
 res.json({'Status': 'UP'});   
});

function verificaJWTUsuario(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET_USUARIO, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Usuario ão autenticado"});
        req.id = decoded.id;
        console.log(req.id + 'fez a chamada');
        next();
    })
};

function verificaJWTInstituicao(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET_INSTITUICAO, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Instituicao não autenticada"});
        req.id = decoded.id;
        console.log(req.id + 'fez a chamada');
        next();
    })
};

routes.get('/usuarios',verificaJWTUsuario, controllerUsuario.List);
routes.get('/usuarios/:id', controllerUsuario.GetOne);
routes.post('/usuarios', controllerUsuario.Create);
routes.put('/usuarios/:id', controllerUsuario.Update);
routes.delete('/usuarios/:id', controllerUsuario.Delete);
routes.post('/usuario/login', controllerUsuario.loginUsuario);

routes.get('/instituicoes', verificaJWTInstituicao,controllerInstituicao.List);
routes.get('/instituicoes/:id', controllerInstituicao.GetOne);
routes.post('/instituicoes', controllerInstituicao.Create);
routes.put('/instituicoes/:id', controllerInstituicao.Update);
routes.delete('/instituicoes/:id', controllerInstituicao.Delete);
routes.post('/instituicao/login', controllerInstituicao.loginInstituicao);

routes.get('/postagens/', controllerPostagem.List); 
routes.get('/postagens/:id', controllerPostagem.GetOne);
routes.post('/postagens/', verificaJWTInstituicao, controllerPostagem.Create);

module.exports = routes;
