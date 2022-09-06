const express = require("express");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3333;
app.use(express.json());
const db = require("./dbConnect.js");

app.listen(port, () => {
    console.info(`Listening on http://localhost:${port}`);
});


//Healh Check
app.get("/", (request, response) => response.sendStatus(200));

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.get('/instituicao', db.getInstituicao)
app.get('/instituicao/:id', db.getInstituicaoById)
app.post('/instituicao', db.createInstituicao)
app.put('/instituicao/:id', db.updateInstituicao)
app.delete('/instituicao/:id', db.deleteInstituicao)



