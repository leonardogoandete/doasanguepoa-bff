require('dotenv').config()
const port = process.env.PORT || 3333;
const express = require('express');
const app = express();
const routes = require('./router');
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const path = require('path')
const rfs = require('rotating-file-stream')
const cors = require('cors')


// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
  })

app.listen(port, () => {
    console.info(`Listening on http://localhost:${port}`);
});
app.use(cors())
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(routes);
app.use(cookieParser())




