
//Express Async error handler, we use commands to install npm
// i express-async-handler and we import the library to interact with
//mongodb and mongoose
const Address = require('../models/addressModel');
const asyncHandler = require("express-async-handler");
//@desc Get all Addresses
//@route GET /api/contacts
//@access public

const getAddresses =  asyncHandler(async (req, res) =>{
    const addresses = await Address.find({ id: req.user.id});
    res.status(200).json(addresses)
   
});
//@desc Create new Address
//@route POST /api/contacts
//@access public

const createAddress = asyncHandler (async (req, res) =>{
    console.log("The request body is:", req.body);

    //Server will Throw an error if the client request fields are empty 
    const { name, phone, email } = req.body;
    if( !phone || !name || !email){
        res.status(400);
        throw new Error("The fielsds are required !")
    }
    const address1 = await Address.create({
        name,
        email,
        phone,
        id: req.user.id
    })
    res.status(200).json({message: "Address Created.", address1});
   
});
//@desc Update  Address
//@route PUT /api/contacts/:id
//@access public

const updateAddress = asyncHandler(async (req, res) =>{
    const address = await Address.findById(req.params.id);
    if(!address){
        res.status(404)
        throw new Error("Address not found.")
    }
    if(address.id.toString() != req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update other users address")
    }
    const updatedAddress = await Address.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
        )
    res.status(200).json({message: "Address updated successfully!", updatedAddress})
   
});
//@desc delete  Address
//@route DELETE /api/contacts/:id
//@access public

const deleteAddress = asyncHandler(async (req, res) => {
    const address = await Address.findById(req.params.id);
    if (!address) {
        res.status(404).json({ message: "Address not found." });
        //return;
    }
    if(address.id.toString() != req.user.id){
        res.status(403)
        throw new Error("User don't have permission to delete other users address")
    }

    await Address.remove();
    res.status(200).json( address);
});

//@desc GET Address
//@route POST /api/contacts:id
//@access public

const getAddress = asyncHandler(async (req, res) =>{
    const address = await Address.findById(req.params.id);
    if(!address){
        res.status(404);
        throw new Error("Address not found.");
    }
    res.status(200).json(address)
   
});





module.exports = { getAddress, createAddress, deleteAddress, getAddresses, updateAddress };