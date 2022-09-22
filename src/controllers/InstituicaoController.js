const { request } = require('express');
const ModelInstituicao = require('../models/instituicoes');
const bcrypt = require('bcrypt');


const List = async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const instituicoes = await ModelInstituicao.findAll();
            return res.json(instituicoes);

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
            const senhaCriptografada = await bcrypt.hash(req.body.senha, 10);
            const instituicoes = await ModelInstituicao.create(
                {
                   //Codigo: req.body.Codigo, // Comentado para gerar automatico
                    nome: req.body.nome,
                    cnpj: req.body.cnpj,
                    email: req.body.email,
                    senha: senhaCriptografada,
                    DataCriacao: date = new Date(),
                    DataAtualizacao: null
                }
            );
            return res.json(instituicoes);

        } catch (erro) {
            return console.error("Erro na Create : ", erro);
        }
    };

const Update = async(req, res) => {
        try {
            const inst = await ModelInstituicao.findByPk(req.params.id);
            if (inst) {
                inst.nome = req.body.nome;
                inst.DataAtualizacao = new Date();
                await inst.save();
            }

            return res.json(inst);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    },

const GetOne = async(req, res) => {
        try {

            const inst = await ModelInstituicao.findByPk(req.params.id);

            return res.json(inst);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    };

const Delete = async(req, res) => {
        try {

            const inst = await ModelInstituicao.findByPk(req.params.id);
            await inst.destroy();
            return res.json(inst);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    };


module.exports = {
    List,
    Create,
    Update,
    GetOne,
    Delete
}
