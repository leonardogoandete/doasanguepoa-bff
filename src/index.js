const { request, response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const port = process.env.PORT || 3333;
const app = express();
app.use(express.json());

const customers = [];

if (process.env.LE_URL && process.env.LE_CONTENT) {
    app.get(process.env.LE_URL, function(req, res) {
      return res.send(process.env.LE_CONTENT)
    });
  }

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// middleware
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;
    const customer = customers.find(customer => customer.cpf === cpf);

    if(!customer){
        return response.status(400).json({ error: "Customer not found"});
    }
    
    request.customer = customer;

    return next();
}

app.post("/account", (request, response) => {
    const { cpf, nome } = request.body;
    const customersAlreadyExist = customers.some(
      (customer) => customer.cpf === cpf
    );

    if (customersAlreadyExist){
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

//app.use(verifyIfExistsAccountCPF);
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    return response.json(customer.statement);
});

app.listen(port, () => {
    console.info(`Listening on http://localhost:${port}`);
});
