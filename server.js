require ('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const petworkController = require('./controllers/petworkControllers')

const app = express()

//--- pull PORT from .env for use with Heroku ---//
// const { PORT = 4321, MONGODB_URL } = process.env


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/', petworkController)

app.set(process.env.port || 4321)


app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')}`)
});