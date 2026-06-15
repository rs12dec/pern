import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { protect } from '../middleware/auth.js';

const router  = express.Router();

const cookieOptions= {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 //30days
};

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
}

//Register a new user
router.post("/register", async (req, res)=> {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({message: "Please provide all required details"});
    }
    
    const userExists = await pool.query("SELECT * FROM usermaster WHERE email = $1",[email]);
     
    if (userExists.rows[0] > 0){
        return res.status(400).json({message: "User already exists"});
     }

     const hashPassword = await bcrypt.hash(password,10);
     
     const newUser = await pool.query("INSERT INTO usermaster (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
         [username, email, hashPassword]);

    const token = generateToken(newUser.rows[0].id);

    res.cookie("token",token,cookieOptions);

    return res.status(201).json({user: newUser.rows[0], token});

})

//Login

router.post("/login", async (req,res)=>{
    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).json({message: "Please provide required details"});
    }
    const users= await pool.query("SELECT * FROM usermaster WHERE email=$1",[email]);

    if (users.rows.length === 0){
        return res.status(400).json({message: "Invalid credentials"});
    }

    const userData = users.rows[0];

    const isMatch = await bcrypt.compare(password, userData.password)

    if (!isMatch){
        return res.status(400).json({message: "Invalid credentials"});
    }
    const token = generateToken(userData.id);

    res.cookie("token",token,cookieOptions);

    res.json({usre: {id: userData.id, email: userData.email, username: userData.username}});

})

//Me
router.get("/me", protect, async (req,res)=>{
    res.json(req.user);
    //return info of the logged in user from protect middleware
})

//Logout

router.post("/logout", async (req, res)=>{
    res.cookie("token","", {...cookieOptions,maxAge: 1 });
    res.json({message: "Logout sucessfully"});
})

export default router;
