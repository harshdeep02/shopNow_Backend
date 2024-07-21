import mongoose from "mongoose";

const userSchemaa = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
})


const User = mongoose.model('user', userSchemaa)
User.createIndexes()
export {User}