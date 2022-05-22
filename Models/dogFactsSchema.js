const { links } = require('express/lib/response')
const mongoose = require('mongoose')


const DogFactsSchema = new mongoose.Schema({
    img: String,
    dogName: String, 
    dogBreed: String,
    dogBirthday: String,
    favoriteToy: String,
    dogDescription: String,

});

const DogFacts = mongoose.model("dog facts", DogFactsSchema);

module.exports = DogFacts;