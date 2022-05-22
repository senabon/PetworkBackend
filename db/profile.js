const Profile = require("../Models/profileSchema")
const seedData = require('./seedData.json');


Profile.deleteMany({})
    .then(()=>{
        return Profile.insertMany(seedData);
    })
    .then(console.log)
    .catch(console.error)
    .finally(()=>{
        process.exit();
    })