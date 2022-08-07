
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')


require('dotenv').config();

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

/**
 * Middleware Ends
 */


app.get('/', (req, res) => {
    res.status(404);
    res.send('Route not found!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
