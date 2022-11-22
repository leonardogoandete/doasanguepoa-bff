const { request } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ModelInstituicao = require('../models/instituicoes');



const List = async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const instituicoes = await ModelInstituicao.findAll({ 
                attributes:  ['id','nome','cnpj','endereco','telefone','email']});
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
                    endereco: req.body.endereco,
                    telefone: req.body.telefone,
                    email: req.body.email,
                    senha: senhaCriptografada,
                    DataCriacao: date = new Date(),
                    DataAtualizacao: null
                }
            );
            console.log(instituicoes.telefone)
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
    };

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

    const loginInstituicao = async(req,res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const {cnpj, senha} = req.body;
        // validations
        if (!cnpj) {
            return res.status(422).json({ msg: "O CNPJ é obrigatório!" });
          }
        
          if (!senha) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
          }
        
          // check if user exists
          const instituicao = await ModelInstituicao.findOne({ where :{ cnpj: cnpj}});
        
          if (!instituicao) {
            return res.status(404).json({ msg: "Instituicao não encontrada!" });
          }
        
          // check if password match
          const checkPassword = await bcrypt.compare(senha, instituicao.senha);
        
          if (!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida" });
          }
        
          try {
            const token = jwt.sign({id: instituicao.id}, process.env.SECRET_INSTITUICAO, { expiresIn: 43200 }) // 43200 = 720 minutos ou 12 Horas
            res.cookie("jwt", token, { maxAge: 300, httpOnly: true });
            res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
          } catch (error) {
            res.status(500).json({ msg: error });
          }
        };

module.exports = {
    List,
    Create,
    Update,
    GetOne,
    Delete,
    loginInstituicao
}
