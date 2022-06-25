import express, { Application } from 'express'
const bodyParser = require('body-parser')
const passport = require("passport");
require("./bootstrap");
require("./database");

const app: Application = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Pass the global passport object into the configuration function
require("./config/passport")(passport);
app.use(passport.initialize());


app.use(require("./router"));

app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err?.message,
        succuess: false
    })
})

const port = 8080
app.listen(port, () => console.log(`Running on port ${port}`))
