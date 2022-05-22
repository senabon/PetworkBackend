require('dotenv').config()
const axios = require('axios');
const express = require('express')
const router = express.Router()

let APIkey = process.env.PETWORK_APP_DOG_KEY

const fetchDogFacts = () => {

	return(
  axios.get("https://api.thedogapi.com/v1/breeds", {
    headers: {'x-api-key': APIkey}
  })
	.then(data => {
		return data
	}))
}


//test route
router.get('/', (req, res) => {
  res.send('Welcome to Petwork!')
});

router.get('/dogfacts', async (req, res) => {
  const data = await fetchDogFacts();
  console.log(data.data)
  res.send({results: data.data})
})

module.exports = router;