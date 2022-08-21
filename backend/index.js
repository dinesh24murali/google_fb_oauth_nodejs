const { OAuth2Client } = require('google-auth-library')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const { PrismaClient } = require('@prisma/client')

require('dotenv').config();

const port = process.env.PORT;
const corsOptions = {
    origin: process.env.FRONTEND_BASE_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const prisma = new PrismaClient();

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

/**
 * Middleware Start
 */
app.use(bodyParser.json());
app.use(cors(corsOptions));

/**
 * Middleware Ends
 */

const setUser = async (req, res, next) => {
    const user = await prisma.user.findFirst({ where: { id: req.session.userId } })
    req.user = user
    next()
}


app.post("/oauth/google", async (req, res) => {
    try {

        const { token } = req.body;
        console.log({
            token,
        })
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID
        });
        console.log({
            ticket,
        })
        const { name, email, picture } = ticket.getPayload();
        const user = await prisma.user.upsert({
            where: { email: email },
            update: { name, picture },
            create: { name, email, picture }
        })
        res.status(201)
        res.json(user);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: true,
        });
    }
})

app.delete("/auth/logout", setUser, async (req, res) => {
    await req.session.destroy()
    res.status(200)
    res.json({
        message: "Logged out successfully"
    })
});

app.get("/me", async (req, res) => {
    res.status(200)
    res.json(req.user)
})


app.get('/', (req, res) => {
    res.status(404);
    res.send('Route not found!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
