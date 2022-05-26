require('dotenv').config()
const axios = require('axios');
const express = require('express')
const Profile = require('../Models/profileSchema')
const router = express.Router()
// const Profile = require('../Models/profileSchema')

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


//Get list of all dog facts
router.get('/dogfacts', async (req, res) => {
  const data = await fetchDogFacts();
  console.log(data.data)
  res.send({results: data.data})
})

//Get information about an individal breed
router.get('/dogfacts/:id', async (req, res) => {
  const data = await fetchDogFacts();
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

//get signup page 
router.post('/signup', function(req,res){
  const {username, password} = req.body;
  const user = new User({username, password});
  user.save(function(error) {
    if(error){
      res.status(500)
      .send('There was a problem with registering. Please try again');
    } else {
      res.status(200)
      .send("Welcome to Petwork");
    }
  });

});

module.exports = router;