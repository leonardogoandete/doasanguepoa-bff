const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  log: console.log,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

// Users
const getUsers = (request, response) => {
  client.query('SELECT * FROM usuarios ORDER BY id_usuario ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { nome, cpf, email, senha } = request.body
  client.query('INSERT INTO usuarios (nome, cpf, email, senha) VALUES ($1, $2, $3, $4) RETURNING *', [nome, cpf, email, senha], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id_usuario}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { nome } = request.body

  client.query(
    'UPDATE usuarios SET nome = $1 WHERE id_usuario = $2 RETURNING *',
    [nome, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${results.rows[0].id_usuario}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *' , [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${results.rows[0].id_usuario}`)
  })
}

// Instituição
const getInstituicao = (request, response) => {
  client.query('SELECT * FROM instituicoes ORDER BY id_instituicoes ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getInstituicaoById = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('SELECT * FROM instituicoes WHERE id_instituicoes = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createInstituicao = (request, response) => {
  const { nome, cnpj, email, senha } = request.body
  client.query('INSERT INTO instituicoes (nome, cnpj, email, senha) VALUES ($1, $2, $3, $4) RETURNING *', [nome, cnpj, email, senha], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`instituicao added with ID: ${results.rows[0].id_instituicoes}`)
  })
}

const updateInstituicao = (request, response) => {
  const id = parseInt(request.params.id)
  const { nome } = request.body

  client.query(
    'UPDATE instituicoes SET nome = $1 WHERE id_instituicoes = $2 RETURNING *',
    [nome, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Instituicao modified with ID: ${results.rows[0].id_instituicoes}`)
    }
  )
}

const deleteInstituicao = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM instituicoes WHERE id_instituicoes = $1 RETURNING *' , [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Instituicao deleted with ID: ${results.rows[0].id_instituicoes}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getInstituicao,
  getInstituicaoById,
  createInstituicao,
  updateInstituicao,
  deleteInstituicao,
}