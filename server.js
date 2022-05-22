require ('dotenv').config()



const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const petworkController = require('./controllers/petworkControllers')

const app = express()


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.set('port', process.env.port || 4321)

app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')}`)
});