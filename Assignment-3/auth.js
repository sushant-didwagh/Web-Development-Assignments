const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
    console.log("Request Body:", req.body);
    if(!req.body){
        return res.status(400).json({message: "No data received"});
    }
    const { email, password } = req.body;
    try {
        const newUser = new User({
            email,
            password
        });
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "User already exists" });
    }
});

router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        if(user.password !== password){
            return res.status(400).json({ message: "Invalid password" });
        }
        res.json({ message: "Login successful" });
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;