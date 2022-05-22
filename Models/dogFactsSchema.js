const { links } = require('express/lib/response')
const mongoose = require('mongoose')


const DogFactsSchema = new mongoose.Schema({
    name: String,
    temperament: String,
    life_span: String,
    alt_names: String,
    wikipedia_url: String,
    origin: String,
    weight: Object,
    country_code: String,
    height: Object

});

const DogFacts = mongoose.model("dog facts", DogFactsSchema);

module.exports = DogFacts;