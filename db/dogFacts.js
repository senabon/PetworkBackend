require('dotenv').config()
const axios = require('axios');

// let APIkey = process.env.PETWORK_APP_DOG_KEY

// const fetchDogFacts = () => {

// 	// let url = "https://api.thedogapi.com/v1/breeds"
// 	let seedDogFacts = []
//   axios.get("https://api.thedogapi.com/v1/breeds", {
//     headers: {'x-api-key': APIkey}
//   })
// 	// .then(data => data.json())
// 	.then(data => {
// 		return data
// 	})
// }

//export fetchDogFacts
module.exports = {fetchDogFacts}
