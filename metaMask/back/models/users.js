const mongoose = require('mongoose')

const UserSchma = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


// UserSchma.virtual('createAt').get(function () {
//     this.name =
// }) 

module.exports = UserModel = mongoose.model('User', UserSchma)