import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import { createError } from "../error.js";
import jwt from 'jsonwebtoken';

export const signup = async(req,res,next)=>{
    try {
        console.log(req.body);
        const salt = bcrypt.genSaltSync(10);
        console.log("salt:",salt);
        const hash = bcrypt.hashSync(req.body.pw,salt);
        const newUser = new User({...req.body,pw:hash});

        await newUser.save();
        res.status(200).send("User has been create!")
     } //catch (err) {
    //     next(createError(404,"not found sorry!"))
    // }
    catch (err) {
        next(err)
    }
}
export const signin = async(req,res,next)=>{
    try {
        const user=  await User.findOne({name:req.body.name})
        if(!user) return next(createError(404,"User not exists"))
        const isCorrect = await bcrypt.compare(req.body.pw,user.pw)
        if(!isCorrect) return next(createError(404,"Password not correct"));
        //res.status(200).send("User has been create!")
        const token = jwt.sign({id:user._id},process.env.JWT)
        const {pw,...others} = user._doc
        res.cookie("access_token",token,{
            httpOnlp:true
        }).status(200).json(others)
     } 
    catch (err) {
        next(err)
    }
}