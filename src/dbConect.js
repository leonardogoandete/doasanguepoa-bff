async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://mxplbsyfoobyef:5994de3f7f7273acb0be03112a45024c1e8b6b9257d8ed63b94e62cd585b7404@ec2-34-203-182-65.compute-1.amazonaws.com:5432/doko47gk84psh'
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
} 