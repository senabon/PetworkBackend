const express = require('express')
const router = express.Router()

//test route
router.get('/', (req, res) => {
  res.send('welcome to petwork!')
});

module.exports = router;