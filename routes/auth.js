import express from 'express'
const router = express.Router();
import { User } from '../userSchema.js'
import { body, validationResult } from'express-validator';
import bcrypt from 'bcryptjs'
const saltRounds = 10;
import  jwt from "jsonwebtoken";
import {fetchUser} from '../middleware/fetchUser.js'

const secKey = "authWithHarshDeep"
router.post('/signup',[
    body('name', "Enter a valid Name").isLength({min:3}),
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be 5 characters").isLength({min:5})
], async(req, res)=>{
    const error = validationResult(req)
    let sucess = false

    if (!error.isEmpty()) {
        return res.status(400).json({sucess, errors: error.array()[0].msg });
        // return res.status(400).json({ errors: errors.array()[0].msg });

    }

    try{
        const existUser = await User.findOne({email:req.body.email})
        if(existUser){
            return res.status(400).json({sucess, errors:"email already exist"});
        }

        const hasPassword =  await bcrypt.hash(req.body.password, saltRounds)
        const user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hasPassword
            // password:req.body.password
        })
        // .then(()=>{
        //     console.log("saved");
        // })

        sucess = true

        const data = {
            id:user.id
        }
        const token = jwt.sign(data , secKey);

        return res.json({sucess, token});

    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({sucess, errors: "Email already exists", message: error.message });
        }
        return res.status(500).json({sucess, errors: "An error occurred while creating the user", message: error.message });
    }
   
    
})


//login   

router.post('/login',[
    body('email', "Enter a valid Email").isEmail(),
    body('password', "Password must be exist").exists()
], async(req, res)=>{

    const errors = validationResult(req)
    let sucess = false

    if(!errors.isEmpty()){
        return res.status(400).json({sucess, error:errors.array()[0].msg})
    }

    try{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json({error:"email not exist"});
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password)
        if(!comparePass){
            return res.status(400).json({error:"Password not matched"});
            // console.log(findMail);
        }

        const data = {
            id:user.id
        }
        const authToken = jwt.sign(data, secKey) 
        // if(!authToken){
        //     return res.status(400).json({error:"Don't change the token"});
        // }
        sucess = true
        return res.send({sucess, user})
    }

    catch(error){
        return res.status(500).json({error:error.message});
    }
   
})



//getuser Deatils   /   login required

// router.post('/user/:', fetchUser, async(req, res)=>{
//     const userId = req.id
//     console.log(userId);
//     try{
//         const user = await User.findById(userId).select("-password")
//         res.send(user)
//     }

//     catch(error){
//         return res.status(500).json({error:error.message});
//     }
// })

export {router}