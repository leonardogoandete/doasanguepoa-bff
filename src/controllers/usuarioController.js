const { request } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ModelUsuario = require('../models/usuario');

const List = async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const usuarios = await ModelUsuario.findAll()
            .then((usuarios) => res.json(usuarios));
        } catch (erro) {
            return console.error("Erro na listagem de usuarios : ", erro);
        }
    };

const Create = async(req, res) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        
    try {
        const senhaCriptografada = await bcrypt.hash(req.body.senha, 10);
        const usuarios = await ModelUsuario.create(
            {
               //Codigo: req.body.Codigo, // Comentado para gerar automatico
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                endereco: req.body.endereco,
                cpf: req.body.cpf,
                email: req.body.email,
                senha: senhaCriptografada,
                DataCriacao: date = new Date(),
                DataAtualizacao: null
            }
        ).then((usuarios) => res.json(usuarios));
        } catch (erro) {
            return console.error("Erro na Create() usuarios : ", erro);
        }
    };

const Update = async(req, res) => {
        try {
            const usu = await ModelUsuario.findByPk(req.params.id);
            if (usu) {
                usu.nome = req.body.nome;
                usu.DataAtualizacao = new Date();
                await usu.save()
                .then((usu) => res.status(200).json(usu.nome));
            }

            return res.json(usu);

        } catch (erro) {
            return console.error("Erro na Update() usuario : ", erro);
        }
    };

const GetOne = async(req, res) => {
        try {

            const usu = await ModelUsuario.findByPk(req.params.id)
            .then((usu) => res.status(200).send("<p>Nome:" + usu.nome + "<br>CPF: " + usu.cpf + "</p>"));

            //return res.json(usu);
            //return res.send("<p>Nome:" + usu.nome + "<br>CPF: " + usu.cpf + "</p>");

        } catch (erro) {
            return console.error("Erro na GetOne() usuario : ", erro);
        }
    };

const Delete = async(req, res) => {
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        try {

            const usu = await ModelUsuario.findByPk(req.params.id);
            await usu.destroy()
            .then((usu) => res.status(200).json(usu.nome));
            //return res.json(usu);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    };

const loginUsuario = async(req,res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
const {cpf, senha} = req.body;
// validations
if (!cpf) {
    return res.status(422).json({ msg: "O CPF é obrigatório!" });
  }

  if (!senha) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  // check if user exists
  const user = await ModelUsuario.findOne({ where :{ cpf: cpf}});

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(senha, user.senha);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const token = jwt.sign({id: user.id}, process.env.SECRET_USUARIO, { expiresIn: 300 }) // 300 = 5 minuto
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
/*
function verificaJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).end();
        req.id = decoded.id;
        next();
    })
};
*/

module.exports = {
    List,
    Create,
    Update,
    GetOne,
    Delete,
    loginUsuario
}
