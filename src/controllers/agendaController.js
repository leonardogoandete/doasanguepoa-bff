const { request } = require('express');
const ModelAgenda = require('../models/agenda.js');
const ehDiaUtil = require('@lfreneda/eh-dia-util');
const estado = "RS";
const horasValidas = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
const List = async(req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        const agenda = await ModelAgenda.findAll();
        return res.json(agenda);

    } catch (error) {
        return console.error("Erro em listar agendamento : ", error);
    }
};
/*
const ListaData = async(req, res) => {
    const {hora} = req.body;
    try {
        //const data = await ModelAgenda.findOne();
        const data = await ModelAgenda.findOne();

        return res.json(data);
        
    } catch (error) {
        return console.error("Erro em listar agendamento : ", error);
    }
};

//payload
/*
{
  "dias" : "2022/03/04",
  "horario": ["{09:00,false,null}","{10:00,false,null}","{11:00,false,null}"]
}
*/

const Agendar = async(req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    try {
        const {dia, hora} = req.body;
        const reserva = await ModelAgenda.findOne({ where: {dia: dia, hora: hora } });
        if(!reserva && ehDiaUtil(dia,estado) == true && horasValidas.includes(hora) == true){
            const agendar = await ModelAgenda.create(
                {
                    dia: dia,
                    idInstituicao: req.body.idInstituicao,
                    hora: hora,
                    idUsuario: req.body.idUsuario,
                    status: true
                }
            );
            return res.json(agendar);
        }else if(!horasValidas.includes(hora)){
            return res.json({"erro":"Horario invalido"});   
        }else if(!ehDiaUtil(dia,estado)){
            return res.json({"erro":"Dia nao eh util"});   
        }else{
            return res.json({"erro":"Horario ja agendado"});
        }
    } catch (error) {
        return console.error("Erro no agendamento : " + error.message).status(400);
    }
}



module.exports = {
    List,
    Agendar,
    //ListaData
}