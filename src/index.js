require('dotenv').config()
const port = process.env.PORT || 3333;
const express = require('express');
const app = express();
const routes = require('./router');

app.listen(port, () => {
    console.info(`Listening on http://localhost:${port}`);
});

app.use(express.json());
app.use(routes);


