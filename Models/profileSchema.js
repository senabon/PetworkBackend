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
    password: {type: String, required: true},
    favorites: Array
});


ProfileSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
})

ProfileSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;