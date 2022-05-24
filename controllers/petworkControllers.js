const express = require('express')
const Profile = require('../Models/profileSchema')
const router = express.Router()

//test route
router.get('/', (req, res) => {
  res.send('welcome to petwork!')
});


module.exports = router;