import express, { Application, Request, Response, NextFunction } from 'express';
const bodyParser = require('body-parser')
const passport = require("passport");
const helmet = require("helmet");
require("./bootstrap");
require("./database");

const app: Application = express()
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Pass the global passport object into the configuration function
require("./config/passport")(passport);
app.use(passport.initialize());


app.use(require("./router"));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	return res.status(err.status || 500).json({
		message: err?.message,
		success: false
	})
})

const port = 8080
app.listen(port, () => console.log(`Running on port ${port}`))
