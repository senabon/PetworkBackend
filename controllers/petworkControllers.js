const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('welcome to petwork!')
});

module.exports = router;