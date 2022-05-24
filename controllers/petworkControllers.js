const express = require('express')
const Profile = require('../Models/profileSchema')
const router = express.Router()

//test route
router.get('/', (req, res) => {
  res.send('welcome to petwork!')
});


































//update 
router.put('/editprofile', async (req, res) => {
  try {
      let updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body)
      console.log(updatedProfile)
      res.json(updatedProfile)
  } catch (error) {
      res.status(4321).json(error);
  }
})

module.exports = router;