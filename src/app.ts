import express, { Application } from 'express'
const bodyParser = require('body-parser')
require("./database");

const app: Application = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

const port = 8080
app.listen(port, () => console.log(`Running on port ${port}`))
