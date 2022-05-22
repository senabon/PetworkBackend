const { links } = require('express/lib/response')
const mongoose = require('../db/connection')


const ProfileSchema = new mongoose.Schema({
    img: String,
    dogName: String, 
    dogBreed: String,
    dogBirthday: String,
    favoriteToy: String,
    dogDescription: String,
    username: String,
    password: String
});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;