require ('dotenv').config()

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const petworkController = require('./controllers/petworkControllers')

const app = express()
app.use(express.urlencoded({extended:true}))

// const corsOptions ={
//   origin:'https://cheery-salmiakki-f8289b.netlify.app/', 
//   credentials:true,           
//   optionSuccessStatus:200
// }
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use('/', petworkController)

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