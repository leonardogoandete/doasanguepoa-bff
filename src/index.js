require('dotenv').config()
const port = process.env.PORT || 3333;
const express = require('express');
const app = express();
const routes = require('./router');
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const path = require('path')
const rfs = require('rotating-file-stream')

// const rescue = require('express-rescue') usar rescue para criar exceções tratadas
const swaggerAutogen = require('swagger-autogen')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
  })

app.use((err, req, res, next) => {
  res.status(500)
  .json({ error: 'i have a bad feeling about this'})
})

app.listen(port, () => {
    console.info(`Listening on http://localhost:${port}`);
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(routes);
app.use(cookieParser())
app.use('/v1/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))


