const express = require("express");
const app = express();
const port = process.env.PORT || 3333;
app.use(express.json());

if (process.env.LE_URL && process.env.LE_CONTENT) {
    app.get(process.env.LE_URL, function (req, res) {
        return res.send(process.env.LE_CONTENT)
    });
}




app.get("/", (req, res) => {
    const teste = process.env.TESTE;
    res.send(teste);
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
