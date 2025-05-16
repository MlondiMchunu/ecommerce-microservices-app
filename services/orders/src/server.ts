require('reflect-metadata');
const express = require('express');
var {AppDataSource} = require('./data-source');

const port = 3002;

const app = express();

app.use(express.json());

app.listen(port, () => {
    console.log(`Orders service is running on port ${port}`)
});
