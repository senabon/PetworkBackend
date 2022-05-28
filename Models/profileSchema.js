const { links } = require('express/lib/response')
const mongoose = require('../db/connection')
const bcrypt =require('bcrypt')

const saltRounds = 10;

const ProfileSchema = new mongoose.Schema({
    img: String,
    dogName: String, 
    dogBreed: String,
    dogBirthday: String,
    favoriteToy: String,
    dogDescription: String,
    username:{ type: String, require: true, unique: true},
    password: {type: String, required: true}
});




const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;