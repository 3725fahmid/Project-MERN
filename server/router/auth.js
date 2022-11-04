const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate')
const cookieParser =require("cookie-parser");


router.use(cookieParser());

require('../db/conn');
const User = require('../model/userSchema');

let token;

router.get('/', (req, res) => {

    res.send('Hello router server');

});

//promise 

// router.post('/register',(req,res) => {

//     const {name,email,phone,work,password,cpassword} = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: 'Plz fill all this property'});
//     }

//     User.findOne({ email:email })
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({error: 'Email alrady exist'});
//         }
//         const user = new User({name,email,phone,work,password,cpassword})
//         user.save().then(() => {
//             res.status(201).json({message: 'user register successfully'});
//         }).catch((err) => res.status(500).json({error:"Failed to register"}));
//     }).catch(err => console.log(err));
// })


//----------    ASYNC AWAIT ---------

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: 'Plz fill all this property' });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: 'Email alrady exist' });
        }else if(password != cpassword) {
            return res.status(422).json({ error: 'password not match' });
        }else {
            const user = new User({ name, email, phone, work, password, cpassword })
        await user.save();
        res.status(201).json({ message: 'user register successfully' });
        }
        
    } catch (err) {
        console.log(err);
    }
});


// login 

router.post('/signin', async(req,res)=> {
    try{
        const {email,password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message:'Please Fill This value'})
        }

        const userLogin = await User.findOne({ email:email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

           token = await userLogin.generateAuthToken();

           res.cookie("jwToken",token, {
            expires:new Date(Date.now() + 25892000000),
            httpOnly:true
           });

           console.log(token);

                if(!isMatch) {
                    res.status(400).json({ error: 'INVALID CREDINTIAL PASS'});
                } else {
                    res.json({ message: " user signin sucessful "});
                }
        }else {
            res.status(400).json({ error: 'INVALID CREDINTIAL'});
        }

        

    } catch(err) {
        console.log(err);
    }
})

router.use(express.json());
router.get('/about', authenticate,(req,res,next) => {
    console.log(res);
    res.send(req.rootUser);
    next();
});

router.get('/getData', authenticate,(req,res,next) => {
    console.log(res);
    res.send(req.rootUser);
    next();
});

//contact page

router.post('/contact', authenticate, async (req,res) => {
    try{
      const {name,email,phone,message} =  req.body;
      if(!name || !email || !phone || !message) {
        console.log('error in contact form');
        return res.json({ error: ' Plz fill the contact form' })
      }

      const userContact = await User.findOne({_id: req.userId});

      if (userContact) {
        const userMessage = await userContact.addMessage(name,email,phone,message);
        await userContact.save();

        res.status(201).json({message:"user Contact sucessfully"})
      }

    } catch (err){
        console.log(err);
    }
});


module.exports = router;