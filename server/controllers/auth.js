import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const signup = async(req,res,next)=>{
    try {
        console.log(req.body);
        const salt = bcrypt.genSaltSync(10);
        console.log("salt:",salt);
        const hash = bcrypt.hashSync(req.body.pw,salt);
        const newUser = new User({...req.body,pw:hash});

        await newUser.save();
        res.status(200).send("User has been create!")
    } catch (error) {
        next(error)
    }
}