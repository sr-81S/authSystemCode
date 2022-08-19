const express = require("express")
const bcrypt = require("bcrypt")
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const authlog = require("../middleware/authlog")
//import Cookies from 'universal-cookie';
 //const Cookies = require("universal-cookie")

const router = express.Router()

// router.get("/", async (req, res)=>{
//     try {
//         const allUser = await User.find();
//         res.json(allUser)
//         // res.cookie('mycookies', 'express').send('cookie set');
//     } catch (error) {
//         res.send("no data in db")
//     }
// })


//resister user and add data into the db
router.post("/api/resister", async (req, res)=>{
    const {name, email, mobile, password, cpassword} = req.body;

    if(!name || !email || !mobile || !password || !cpassword){
       return res.status(422).json({error: "field missing"})
    }
    if(password !== cpassword){
        return res.status(422).json({error: "Conform password not match"})
    }


    const chUser = await User.findOne({email: email})
    
    if(chUser){
        return res.status(400).json({error: "user have an account"})
    }

    const chPass = await User.findOne({password:password})

    if(chPass){
       return res.status(401).json({error: "Password use by a user"})
    }


    
    try {
        const nmUser = new User({name, email, mobile, password, cpassword});

        //here hash password


        await nmUser.save();
        res.status(200).json({message: "user created"})
    } catch (error) {
        res.status(200).json({message: error})
    }

})



//user login route
router.post("/api/signin", async(req, res)=>{
    // console.log(req.body);
    const {email, password} = req.body;


    if(!email || !password){
        return res.status(404).json({message: "field miss"})
    }


    try {
        const chEmail = await User.findOne({email:email})
        console.log(chEmail);
       
        if(chEmail){
            const chPass = await bcrypt.compare(password, chEmail.password)   
            const gToken = await chEmail.genrateToken()
            // res.setHeader('Access-Control-Allow-Credentials', true);
            console.log(gToken);

            res.cookie("authtoken",gToken,{domain: "*"})
            // res.cookie("auth",gToken)

            // const cookies = new Cookies();
            // res.cookies.set('auth',gToken , { path: '/' });
            
            // res.cookie("token", gToken, );

            if(!chPass){
                return res.status(400).json({message: "invalid cradential"})
            }else{
                
                 res.status(200).json({message: `user login `, token: gToken})

            }
            
        }
    } catch (error) {
        res.status(404).json({message: " error in login"})
    }
})


router.get("/api/about", authlog, (req, res)=>{
    console.log("inside about");
    console.log(req.rootUser);
    res.send(req.rootUser)
})






module.exports = router