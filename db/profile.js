const Profile = require("../models/profileSchema")
const seedData = require('.seedData.json');


Profile.deleteMany({})
    .then(()=>{
        return Profiles.insertMany(seedData);
    })
    .then(console.log)
    .catch(console.error)
    .finally(()=>{
        process.exit();
    })