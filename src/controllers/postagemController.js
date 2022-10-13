const { request } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ModelPostagem = require('../models/postagem');

const List = async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const postagem = await ModelPostagem.findAll();
            return res.json(postagem);

        } catch (erro) {
            return console.error("Erro na List : ", erro);
        }
    };

const Create = async(req, res) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        
    try {
        const postagem = await ModelPostagem.create(
            {
                mensagem: req.body.mensagem,
                DataCriacao: date = new Date(),
                DataAtualizacao: null
            }
        );
            return res.json(postagem);

        } catch (erro) {
            return console.error("Erro na Create : ", erro);
        }
    };

const Update = async(req, res) => {
        try {
            const postagem = await ModelPostagem.findByPk(req.params.id);
            if (postagem) {
                postagem.mensagem = req.body.nome;
                postagem.DataAtualizacao = new Date();
                await postagem.save();
            }

            return res.json(postagem);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    };
/*
const GetOne = async(req, res) => {
        try {

            const usu = await ModelPostagem.findByPk(req.params.id);

            //return res.json(usu);
            return res.send("<p>Nome:" + usu.nome + "<br>CPF: " + usu.cpf + "</p>");

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    };
*/
const Delete = async(req, res) => {
    res.header("Access-Control-Allow-Methods", 'DELETE');
        try {

            const postagem = await ModelPostagem.findByPk(req.params.id);
            await postagem.destroy();
            return res.json(postagem);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    };

module.exports = {
    List,
    Create,
    Update,
    //GetOne,
    Delete,
    //loginUsuario
}
