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
    // daily:{
    //     type:[Number],
    // },
    // monthly:{
    //     type:[Number],
    // },
    // yearly:{
    //     type:[number],
    // },
},
{timestamps:true});

export default mongoose.model("User",UserSchema);