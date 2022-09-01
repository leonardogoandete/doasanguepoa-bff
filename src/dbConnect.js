const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  log: console.log,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

const getUsers = (request, response) => {
  client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { nome, idade } = request.body

  client.query('INSERT INTO users (nome, idade) VALUES ($1, $2, $3)', [id, nome, idade], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { nome, idade } = request.body

  client.query(
    'UPDATE users SET nome = $1, idade = $2 WHERE id = $3',
    [nome, idade, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

// teste
const createUserTeste = (request, response) => {
  const { name, email } = request.body

  client.query('INSERT INTO teste (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const getUsersTeste = (request, response) => {
  client.query('SELECT * FROM teste ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersTeste,
  createUserTeste,
}