require('dotenv').config()
const axios = require('axios');
const express = require('express');
const { append } = require('express/lib/response');
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
  const id = req.params.id - 1
  console.log(data.data)
  res.send({results: data.data[id]})

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

//update 
router.put('/editprofile/:id', async (req,res)=>{
  try{
    let updateProfile = await Profile.find({username: req.params.id}, req.body)
    res.json(updateProfile)
  } catch(error){
    res.status(400).json(error)
  }
})



module.exports = router;