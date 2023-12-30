const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc register user
//@route POST /api/users/register
//@access public

const userRegister =  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if( !username || !email || !password ){
        res.status(400);
        throw new Error("All fields are required!");

    }
    const userAvailable = await User.findOne({email});
    if( userAvailable){
        res.status(400);
        throw new Error("Email address already exist! choose a new one");

    }

    //Hash password using bcrypt algorithm
    const hashPassword = await bcrypt.hash(password, 10)
    console.log("Hash password: ", hashPassword);

    //create or register new user
    const createUser = await User.create({
        username,
        email,
        password: hashPassword
    })
    console.log("User created: ", createUser);
    if( createUser){
      res.status(201).json({ _id: createUser.id, email: createUser.email})
    } else {
        res.status(400);
        throw new Error("User data is not valid")
    }
    res.json({ message: "Register user"})
    });

    //@desc login user
//@route POST /api/users/login
//@access public
const userLogin =  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if( !email || !password ){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
  
    const user = await User.findOne({ email })
    //compare pasword with hashed password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10m"});

        res.status(200).json({accessToken})
    } else{
      res.status(400);
      throw new Error("Email or password is not valid. ")
    }
    res.json({ message: "Login user"})
    });

    //@desc current user
//@route GET /api/users/current
//@access private
const currentUser =  asyncHandler(async (req, res) => {
    res.json(req.user);
    });






    module.exports = {userRegister, userLogin, currentUser};