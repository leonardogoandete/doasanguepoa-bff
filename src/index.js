const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
app.use(express.json());


const db = mysql.createPool({
    host: "",
    user: "",
    password: "",
    database: "", //nome do banco
});



app.get("/", (req, res) => {
    res.send(process.env.TESTE);
});

// middleware
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;
    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return response.status(400).json({ error: "Customer not found" });
    }

    request.customer = customer;

    return next();
}

app.post("/account", (request, response) => {
    const { cpf, nome } = request.body;
    const customersAlreadyExist = customers.some(
        (customer) => customer.cpf === cpf
    );

    if (customersAlreadyExist) {
        return response.status(400).json({ error: "Customer already exists" });
    }

    customers.push({
        cpf,
        nome,
        id: id = uuidv4(),
        statement: [],
    });

    return response.status(201).send('<p>Cadastro do realizado com sucesso!</p>');
});



app.listen(port, () => {
    console.info(`Listening on http://localhost:${port}`);
});
