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
        type:[String],
        default: [],
    },
    monthly:{
        type:[String],
        default: [],
    },
    yearly:{
        type:[String],
        default: [],
    },
},
{timestamps:true});

export default mongoose.model("User",UserSchema);