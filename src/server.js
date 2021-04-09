require('dotenv').config()

const express = require('express')
const { json, urlencoded } = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const blogRoutes = require("./blog/routes")

const app = express()

const port = process.env.PORT

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use("/blog", blogRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))