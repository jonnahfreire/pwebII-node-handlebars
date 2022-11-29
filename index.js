const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const routes = require('./routes')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(routes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express started at http://localhost:${port}`)
})