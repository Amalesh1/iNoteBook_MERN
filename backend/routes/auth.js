const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const JWT_SECRET = "Amaisagoodb$oy";
const jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')



// Create a useer using : POST "/api/auth". No login required
// Route: 1
router.post('/createuser', [
  body('name', "Enter valid name").isLength({min: 3}),
    body('email', 'Enter valid email').isEmail(),
    
    body('password', 'Enter password of length 5 and above').isLength({min: 5})
], async (req, res)=>{
  // If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    try{
      let user = await User.findOne({email: req.body.email});
      // Check wheather the user with this email exists already
    if(user){
      return res.status(400).json({error: "Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // create a new user
    user = await User.create({

        name: req.body.name,
        password: secPass,
        email: req.body.email
      });
      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json('Authtoken: ', authToken)
    }
    catch(error){
      console.error(error.message)
      res.status(500).send("Internal Server Error")
    }
})

// Authenticate a user
//Route: 2
router.post('/login', [
  body('email', "Enter valid email").isEmail(),
    body('password', 'Password cannot be blank!').exists(),
    
    body('password', 'Enter password of length 5 and above').isLength({min: 5})
], async (req, res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body
    try{
      let user = await User.findOne({email})
      if(!user){
        return res.status(400).json({error: "Login with valid credential"});

      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error: "Login with valid credential"});
      }
      
      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({authToken})
    }
    catch(error){
      console.error(error.message)
      res.status(500).send("Internal Server Error Occured")
    }
})

// Route - 3 : Get logged in user details using POST method Login Required
router.post('/getuser', fetchuser, async (req, res)=>{
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("password")
    res.send(user);
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error Occured")
  }
})


module.exports = router;