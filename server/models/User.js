import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true,
    },
    email:{
        type: String,
        require:true,
        unique:true,
    },
    pw:{
        type: String,
        require:true,
    },
    daily:{
        type:[number],
    },
    monthly:{
        type:[number],
    },
    yearly:{
        type:[number],
    },
},
{timestamps:true});

export default mongoose.model("user",UserSchema);