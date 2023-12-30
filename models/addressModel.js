const mongoose = require('mongoose');

const addressSchema =  mongoose.Schema({
      id:{
     type: mongoose.Schema.Types.ObjectId,
     requered: true,
     ref: "User"
      },

    name:{
        type: String,
        required: [true, "Please add the address name"],

    },
    email:{
        type: String,
        required: [true, "Please add the email address"],

    },
    phone:{
        type: String,
        required: [true, "Please add the address phone"],

    },

}, {timestamps: true})

module.exports  = mongoose.model('Address', addressSchema);

//module.exports = Address;