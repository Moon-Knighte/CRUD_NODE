const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please enter a username"]
    },
    email:{
        type: String,
        required: [true, "Please enter a email address"],
        unique: [true, "Email address is already taken"]
    },
    password:{
        type: String,
        required: [true, "Please enter a password"],
        unique: true
    }

}, { timestamps: true})

module.exports = mongoose.model("User", userSchema);