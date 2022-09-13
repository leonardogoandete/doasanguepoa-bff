const bcrypt = require('bcrypt');

function senhaCriptografada(senha) {
    return bcrypt.hash(senha, 10);
}

module.exports = senhaCriptografada;