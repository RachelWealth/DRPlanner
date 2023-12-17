import mongoose from "mongoose";
import bcrypt from "bcrypt"

export const signup = async(req,res)=>{
    try {
        console.log(req.body);
        const salt = bcrypt.getSaltSync(10);
        console.log("salt:",salt);
        const hash = bcrypt.hashSync(req.body.password,salt);
        const newUser = new User({...req.body,pw:hash});

        await newUser.save();
        res.status(200).send("User has been create!")
    } catch (error) {
        next(err)
    }
}