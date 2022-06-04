require ('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const petworkController = require('./controllers/petworkControllers')

const app = express()
app.use(express.urlencoded({extended:false}))

const corsOptions ={
  origin:'https://629ab49c6e0c1b12c11c14b2--cheery-salmiakki-f8289b.netlify.app/', 
  credentials:true,           
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json())
app.use('/', petworkController)

app.set(process.env.port || 4321)


app.listen(process.env.PORT || 4321, () => {
  console.log(`PORT: ${app.get('port')}`)
});