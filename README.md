# Petwork-Backend
___________________

### Project Description
This is the backend of a pet (dog) parent networking app, where users can create profiles to share information about their dogs, look up basic information about different dog breeds, and "love" (like) their favorite breeds to save for later!

### Link to Deployed API
Live version deployed to heroku at:

### Technologies Used
Express.js, Node.js, MongoDB, Mongoose, The Dog API

### Links to Frontend Materials
- Frontend GitHub: https://github.com/senabon/petworkfrontend
- Frontend Live Application: https://629ab49c6e0c1b12c11c14b2--cheery-salmiakki-f8289b.netlify.app/

### Key Features
- An API that sends JSON data of users, dog breed information, and favorites to the front end
- Uses a 3rd party Dog API to fetch data about different dog breeds
- Uses bcrypt and JWT to help keep user passwords protected 

### Major Hurdles
- Allowing users to search for a dog breed using the name of a dog (*solved*)
- Getting the user authentication to create and authenticate users correctly and consistently (*solved*)
- Using the dog ID from the 3rd party API as the params ID instead of the index of the dog in the API, so that when individual dogs were clicked from the all dogs list, the correct individual dog showed (*solved*)
- Keeping a user log-in passed the authentication, displaying the signed-in users profile after log-in, and creating a log out button (*solved*)
- Connecting the favorite / like status of different individual dog breeds to the user specifically (*unsolved*)
- Allowing users to be able to upload a picture of their dog to their profile (*unsolved*)

### Authors / Contributors
Briana Casey, Sena Diaz, & Taylor Lee