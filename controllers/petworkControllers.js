require('dotenv').config()
const axios = require('axios');
const express = require('express');
const { append } = require('express/lib/response');
const Profile = require('../Models/profileSchema')
const router = express.Router()

//for auth
const usersData = {
  users: require('../db/seedData.json'),
  setUsers: function (data) {this.users = data}
}
const fsPromises = require('fs'.promises);
const path = require('path')
const bcrypt = require('bcrypt')

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

//update 
router.put('/profile/:id', async (req,res)=>{
  try{
    let updateProfile = await Profile.findOneAndUpdate({username: req.params.id}, req.body)
    res.json(updateProfile)
  } catch(error){
    res.status(400).json(error)
  }
})





//for signup 

const handleNew = async (req,res)=>{
  const {user, password} =req.body;
  if (!user||!password)
    return res.status.json({'message': 'Username and Password Required'});
  const alreadyTaken = usersData.users.find( dog => dog.username===user)
  if(alreadyTaken) return res.sendStatus(409);
  try{
    const hashedPassword = await bcrypt.hash(password, 10)//salt rounds ---->encryption
    const newUser = {"username": user, "password": hashedPassword}
    usersData.setUsers([...usersData.users, newUser])
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'db',"seedData.json"),
      JSON.stringify(usersData.users)
    );
    console.log (usersData.users)
    res.status.json({'succes':`User ${user} has been created!` })
  }catch(error){
    res.status.json({'mesage': error.message})
  }
}

router.post('/profile', handleNew)


//for signin

const handleSignin = async (req, res)=>{
  const {user, password} =req.body;
if (!user||!password)
  return res.status.json({'message': 'Username and Password Required'});
  const userFound = usersData.users.find(dog =>dog.username ===user);
  if(!userFound) return res.sendStatus(401);
  const matchFound = await bcrypt.compare(password, userFound.password);
  if (matchFound){
    res.json({'success':`User ${user} is now logged in`})
  }else{
    res.sendStatus(401);
  }
}

router.post('/profile', handleSignin)

//Add breed as a favorite
// router.post('/dogfacts/:id', async (req, res) => {
  // if signed in, then change like status attached to profile to like
  // else, if not signed in, don't allow like 
// })

module.exports = router;