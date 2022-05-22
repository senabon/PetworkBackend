require ('dotenv').config()

const express = require('express')

const app = express()

const mongoose = require('mongoose');

const cors = require('cors')
const morgan = require('morgan')

app.use(cors())

app.set('port', process.env.port || 4321)

app.listen(app.get('port'), () => {
  console.log(`PORT: ${app.get('port')}`)
});