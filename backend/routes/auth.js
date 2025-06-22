const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var fetchuser= require('../middlewares/fetchuserid');
var jwt = require('jsonwebtoken');

const JWT_Secret = "Cheemamerijan" ;
// Create a user   in the database
router.post('/createuser', [

    body('email', 'Please enter a valid email').isEmail(),
    body('name', 'please enter valid name').isLength({ min: 3 }),
    body('password', 'Please enter min 5 characters password').isLength({ min: 5 }),

], async (req, res) => {
    let success=false;
    //if there are errors, return the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check wheather the user with same email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
             success=false;
            return res.status(400).json({ success, error: "Sorry user already exists with this email" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass, 
        })
        
        const Data = {
            user:{
                id : user.id
            } 
        }
        const authToken = jwt.sign(Data, JWT_Secret);
         success=true;
        res.json({success, authToken:authToken});


    } catch (error) {
        console.log(error.message);
        res.status(500).send({ "message": "Some error occured" })
    }

})
//Authenticate a user using post api/auth/Login  no Login required
router.post('/login', [

    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter password').exists(),

], async (req, res) => {
    let success=false;
    //If there are errors return bad errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user){
            success= false;
           return  res.status(400).json({success, error: "Please login with the correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success= false;
            return  res.status(400).json({success, error: "Please login with the correct credentials"});
        }
        const Data = {
            user:{
                id : user.id
            } 
        }
        const authToken = jwt.sign(Data, JWT_Secret);
        success= true;
        res.json({success, authToken:authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "Internal server error" })
    }
})
          //Route-3 Get Loggedin user details using Post /api/auth/getuser  login required
          router.post('/getuser', fetchuser ,async (req, res) => {
          try {
            const userId =req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
          } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: "Internal server error" })
          }
        })
module.exports = router;