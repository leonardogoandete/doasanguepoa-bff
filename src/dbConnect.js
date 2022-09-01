const { Client } = require('pg')
const client = new Client({
  user: '${DB_USER}',
  host: '${DB_URL}',
  database: '${DB_DATABASE}',
  password: '${DB_PASS}',
  port: '${DB_PORT}',
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});