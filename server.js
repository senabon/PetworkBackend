require ('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const petworkController = require('./controllers/petworkControllers')

const app = express()
app.use(express.urlencoded({extended:false}))

//--- pull PORT from .env for use with Heroku ---//
// const { PORT = 4321, MONGODB_URL } = process.env.port


const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json())
app.use('/', petworkController)

app.set('port', process.env.port || 4321)


app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')}`)
});