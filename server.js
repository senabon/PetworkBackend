require ('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const petworkController = require('./controllers/petworkControllers')

const app = express()
app.use(express.urlencoded({extended:true}))


app.use(cors());
app.use(morgan('dev'))
app.use('/', petworkController)
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.set(process.env.port || 4321)


app.listen(process.env.PORT || 4321, () => {
  console.log(`PORT: ${app.get('port')}`)
});