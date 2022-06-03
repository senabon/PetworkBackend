require('dotenv').config()
const axios = require('axios');
const express = require('express');
const jwt = require('jsonwebtoken')
const Profile = require('../Models/profileSchema')
const router = express.Router()

const path = require('path')
const bcrypt = require('bcrypt')

let APIkey = process.env.PETWORK_APP_DOG_KEY

const favorites =[]

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

const fetchDogFacts = () => {

	return(
  axios.get("https://api.thedogapi.com/v1/breeds", {
    headers: {'x-api-key': APIkey}
  })
	.then(data => {
		return data
	}))
}


//CORS route
router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
  res.send("Welcome to Petwork!")
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
  res.send({result, likeStatus: favorites.includes(req.params.id)})
})

//Get favorited breeds
router.get('/favorites', async (req, res) => {
  res.send({favorites})
})

//Get profile
router.get('/profile/:id', (req, res) => {
  Profile.findOne({username: req.params.id})
  .then((result) => res.send(result))
})

//update favorite status
router.post('/dogfacts/:id', (req, res) => {
  const id=req.params.id
  if (!favorites.includes(id)){
    favorites.push(req.params.id)
    res.json({likeStatus: true})
  } else {
    favorites.splice(favorites.indexOf(id), 1)
    res.json({likeStatus: false})
  }

  // Profile.findOne({username})
  // .then(user => {
  //   if (!user.favorites.includes(id)){
  //     user.favorites.push(req.params.id)
  //     res.json({likeStatus: true})
  //   } else {
  //     user.favorites.splie(user.favorites.indexOf(id), 1)
  //     res.json({likeStatus: false})
  //   }
  // })
  // if(!usersData.users[0].favorites.includes(id)){
  //   usersData.users[0].favorites.push(req.params.id)
  //   res.json({likeStatus: true})
  // } else {
  //   usersData.users[0].favorites.splice(usersData.users[0].favorites.indexOf(id), 1)
  //   res.json({likeStatus: false})
  // }
})


const registerUser = async (req, res) => {
  const {username, password, dogName, dogBreed, dogBirthday, favoriteToy, dogDescription} = req.body;

  const userExists = await Profile.findOne({ username })

  if (userExists){
    res.status(400)
    throw new Error("User Already Exists");
  }

  const user = await Profile.create({
    username,
    password,
    dogName,
    dogBreed,
    dogBirthday, 
    favoriteToy, 
    dogDescription,
    favorites,
  })

  if(user){
    res.status(201).json({
      _id: user._id,
      username: user.username,
      dogName: user.dogName,
      dogBreed: user.dogBreed,
      dogBirthday: user.dogBirthday,
      favoriteToy: user.favoriteToy,
      dogDescription: user.dogDescription,
      favorites: user.favorites,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new Error("Error Occured")
  }
  res.json({
    username,
  })
}

router.post('/profile', registerUser);


const authUser = async (req, res) => {
  const {username, password} = req.body;

  const user = await Profile.findOne({username})

  if(user && (await user.matchPassword(password))){
    res.send({
      _id: user._id,
      username: user.username,
      dogName: user.dogName,
      dogBreed: user.dogBreed,
      dogBirthday: user.dogBirthday,
      favoriteToy: user.favoriteToy,
      dogDescription: user.dogDescription,
      token: generateToken(user._id)
    }) 
  } else {
    res.status(400);
    throw new Error("Invalid User or Password")
  }
}

router.post('/profile/:id', authUser);





module.exports = router;