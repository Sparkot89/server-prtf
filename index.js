const express = require('express')
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const { response } = require('express')
const app = express()
const port = 3006
const baseUrl = 'https://api.sendinblue.com/v3/smtp/email'
var corsOptions = {
    origin: 'https://my-porfolio-bzrd.onrender.com',
    optionsSuccessStatus: 200
}

var jsonParser = bodyParser.json()
app.post('/email', jsonParser, cors(corsOptions), async (req, res) => {
    console.log(req)
    const options = {
        method: 'POST',
        url: baseUrl,
        withCredentials: false,
        data: {
            sender: {
                name: req.body.sender.name.toString(),
                email: req.body.sender.email.toString(),
            },
            to: [
                {
                    email: req.body.to[0].email.toString(),
                    name: req.body.to[0].name.toString()
                }
            ],
            subject: req.body.subject.toString(),
            htmlContent: req.body.htmlContent.toString()
        },
        headers: {
            accept: "application/json",
            "api-key": `${process.env.API_KEY_PORTFOLIO}`,
            "content-type": "application/json"
        }
    }
    const resp = await axios.request(options)
    res.send(resp.data)
})

app.use(cors())

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})