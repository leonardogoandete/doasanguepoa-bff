const { request } = require('express');
const ModelAgenda = require('../models/agenda.js');
const ModelInstituicao = require('../models/instituicoes.js');
const ehDiaUtil = require('@lfreneda/eh-dia-util');
const estado = "RS";
const horasValidas = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

const List = async (req, res) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    try {
        const agenda = await ModelAgenda.findAll({
            include: [{
                model: ModelInstituicao,
                attributes: { exclude: ['id', 'senha'] }
            }],
            attributes: { exclude: ['senha'] }
        });
        return res.json(agenda);
        //fazer factory aqui se der

    } catch (error) {
        return console.error("Erro em listar agendamento : ", error);
    }
};

const Agendar = async (req, res) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');

    try {
        const { dia, hora } = req.body;
        const reserva = await ModelAgenda.findOne({ where: { dia: dia, hora: hora } });
        if (!reserva && ehDiaUtil(dia, estado) == true && horasValidas.includes(hora) == true) {
            const agendar = await ModelAgenda.create(
                {
                    dia: dia,
                    idInstituicao: req.body.idInstituicao,
                    hora: hora,
                    idUsuario: req.body.idUsuario,
                    status: true
                }
            );
            return res.send("Agendado com sucesso").status(200);
        } else if (!horasValidas.includes(hora)) {
            return res.send("Horario invalido").status(400);
        } else if (!ehDiaUtil(dia, estado)) {
            return res.send("Dia nao eh util").status(400);
        } else {
            return res.send("Horario ja agendado").status(400)
        }
    } catch (error) {
        return console.error("Erro no agendamento : " + error.message).status(400);
    }
}



module.exports = {
    List,
    Agendar
}