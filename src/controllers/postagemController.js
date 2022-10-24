const { request } = require('express');
const ModelPostagem = require('../models/postagem.js');
const ModelInstituicao = require('../models/instituicoes.js');
//const Postagem = require('../models/postagem.js');

const List = async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const postagem = await ModelPostagem.findAll( { 
                attributes:  ['id','mensagem'],
                include: [ {model: ModelInstituicao, attributes: ['nome'] }]         
             });
             console.log(postagem)
             return res.json(postagem)

        } catch (erro) {
            return console.error("Erro na List : ", erro);
        }
    };

// pesquisa a mensagem e mostra o dono
const GetOne = async(req, res) => {
    try {
        const postagem = await ModelPostagem.findByPk(req.params.id, { include: ModelInstituicao });
        return res.json({"Instituicao": postagem.instituico.nome, "mensagem": postagem.mensagem});
    } catch (erro) {
        return console.error("Erro na Update : ", erro);
    }
};

//procura o dono e mostra as postagens
//const instituicao = await ModelInstituicao.findByPk(req.params.id, { include: Postagem });
/////////////

const Create = async(req, res) => {
    //await db.sync({ force: true });
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        
    try {
        const postagem = await ModelPostagem.create(
            {
                mensagem: req.body.mensagem,
                idInstituicao: req.body.idInstituicao,
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
                postagem.mensagem = req.body.mensagem;
                postagem.updatedAt = new Date();
                await postagem.save();
            }

            return res.json(postagem);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    };

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
    GetOne,
    Delete,
}
