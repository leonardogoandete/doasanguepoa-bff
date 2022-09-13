const { request } = require('express');
const ModelUsuario = require('../models/usuario');

module.exports =
{
    async List(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const usuarios = await ModelUsuario.findAll();
            return res.json(usuarios);

        } catch (erro) {
            return console.error("Erro na List : ", erro);
        }
    },

    async Create(req, res) {
              //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        
        try {
            const usuarios = await ModelUsuario.create(
                {
                   //Codigo: req.body.Codigo, // Comentado para gerar automatico
                    nome: req.body.nome,
                    cpf: req.body.cpf,
                    email: req.body.email,
                    senha: req.body.senha,
                    DataCriacao: date = new Date(),
                    DataAtualizacao: null
                }
                /*

                https://stackoverflow.com/questions/17201450/salt-and-hash-password-in-nodejs-w-crypto
  encript
                function hashPassword(password) {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var hash = pbkdf2(password, salt, iterations);

    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}
descript
function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
    return savedHash == pbkdf2(passwordAttempt, savedSalt, savedIterations);
}
*/
            );
            return res.json(usuarios);

        } catch (erro) {
            return console.error("Erro na Create : ", erro);
        }
    },

    async Update(req, res) {
        try {
            const usu = await ModelUsuario.findByPk(req.params.id);
            if (usu) {
                usu.nome = req.body.nome;
                usu.DataAtualizacao = new Date();
                await usu.save();
            }

            return res.json(usu);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    },

    async GetOne(req, res) {
        try {

            const usu = await ModelUsuario.findByPk(req.params.id);

            return res.json(usu);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    },

    async Delete(req, res) {
        try {

            const usu = await ModelUsuario.findByPk(req.params.id);
            await usu.destroy();
            return res.json(usu);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    }


}
