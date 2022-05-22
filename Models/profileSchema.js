const { links } = require('express/lib/response')
const mongoose = require('mongoose')


const ProfileSchema = new mongoose.Schema({
    img: String,
    dogName: String, 
    dogBreed: String,
    dogBirthday: String,
    favoriteToy: String,
    dogDescription: String,

});

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;