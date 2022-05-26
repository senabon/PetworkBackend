require('dotenv').config()
const axios = require('axios');
const express = require('express')
const Profile = require('../Models/profileSchema')
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

const fetchDogDetails = (id) => {

	return(
  axios.get(`https://api.thedogapi.com/v1/breeds/${id}`, {
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


//Get list of all dog facts
router.get('/dogfacts', async (req, res) => {
  const data = await fetchDogFacts();
  res.send({results: data.data})
})

//Get information about an individal breed
router.get('/dogfacts/:id', async (req, res) => {
  const data = await fetchDogFacts();
  let result = data.data.filter(dog => {
    return dog.id == req.params.id
  })
  console.log(req.params.id)
  res.send({result})
})


//Get user profile
router.get('/profile/:id', async(req, res) => {
  try {
    let profileFound = await Profile.find({username: req.params.id})
    res.json(profileFound)
  } catch(error) {
    res.status(400).json(error);
  }
})


module.exports = router;