const mongoose = require('mongoose')

mongoose.Promise = Promise

const connectionString ='mongodb+srv://sendiaz:Missgoober13!@cluster0.ppchy.mongodb.net/?retryWrites=true&w=majority'
const mongoURI = process.env.NODE_ENV === 'production'
? process.env.DB_URL
: connectionString

mongoose.connect(mongoURI)
.then((instance) => console.log(`Connected to db: ${instance.connections[0].name}`))
.catch((error) => console.log("Connection failed!", error))

module.exports = mongoose;