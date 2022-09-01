usuario = process.env.DB_USER;
servidor = process.env.DB_URL;
base = process.env.DB_DATABASE;
porta = process.env.DB_PORT;
const { Client } = require('pg')
const client = new Client({
  user: usuario,
  host: servidor,
  database: base,
  password: porta,
  port: porta,
  ssl: true
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  return response.status(201).send('<p>Banco conectado!</p>');

});