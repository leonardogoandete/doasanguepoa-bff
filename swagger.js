const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./src/index')           // Your project's root file
})
