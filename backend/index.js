
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const session = require('express-session')

const authHandler = require('./utils/authHandler');

const app = express()

require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth').Strategy

const port = process.env.PORT;
const corsOptions = {
    origin: process.env.FRONTEND_BASE_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/**
 * Middleware Start
 */
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))

/**
 * Middleware Ends
 */
 app.use(passport.initialize())
 // init passport on every route call.
 app.use(passport.session())
 // allow passport to use "express-session".

 passport.use(new GoogleStrategy (authHandler))

app.get('/', (req, res) => {
    res.status(404);
    res.send('Route not found!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
