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

ProfileSchema.pre('save', function(next){
    if(TouchList.isNew||this.isModified('password')){
        const input = this;
        bcrypt.hash(input.password, saltRounds,
            function(error, hashedPassword){
                if(error){
                    nect(error);
                }else{
                    input.password=hashedPassword;
                    next();
                }
            })
    }
})

const Profile = mongoose.model("profile", ProfileSchema);

module.exports = Profile;