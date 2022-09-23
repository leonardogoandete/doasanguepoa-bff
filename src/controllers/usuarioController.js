const { request } = require('express');
const ModelUsuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const List = async(req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        try {
            const usuarios = await ModelUsuario.findAll();
            return res.json(usuarios);

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
        const usuarios = await ModelUsuario.create(
            {
               //Codigo: req.body.Codigo, // Comentado para gerar automatico
                nome: req.body.nome,
                cpf: req.body.cpf,
                email: req.body.email,
                senha: senhaCriptografada,
                DataCriacao: date = new Date(),
                DataAtualizacao: null
            }
        );
            return res.json(usuarios);

        } catch (erro) {
            return console.error("Erro na Create : ", erro);
        }
    };

const Update = async(req, res) => {
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
    };

const GetOne = async(req, res) => {
        try {

            const usu = await ModelUsuario.findByPk(req.params.id);

            //return res.json(usu);
            return res.send("<p>Nome:" + usu.nome + "<br>CPF: " + usu.cpf + "</p>");

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    };

const Delete = async(req, res) => {
        try {

            const usu = await ModelUsuario.findByPk(req.params.id);
            await usu.destroy();
            return res.json(usu);

        } catch (erro) {
            return console.error("Erro na Update : ", erro);
        }
    };

const Login = async(req,res, next) => {
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
  //console.log("Validando:"+ user.nome + "senha: " + user.senha);
  //console.log("Validando:"+ user.nome);

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(senha, user.senha);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
      
    );
    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
    console.log(token);

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
    Login
}
