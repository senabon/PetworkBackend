require ('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const petworkController = require('./controllers/petworkControllers')

const app = express()
app.use(express.urlencoded({extended:false}))

//--- pull PORT from .env for use with Heroku ---//
// const { PORT = 4321, MONGODB_URL } = process.env


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/', petworkController)

app.set(process.env.port || 4321)


app.listen(process.env.PORT || 4321, () => {
  console.log(`PORT: ${app.get('port')}`)
});