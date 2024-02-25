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
    fromGogle:{
        type: String,
        default:false,
    }
},
{timestamps:true});

export default mongoose.model("User",UserSchema);