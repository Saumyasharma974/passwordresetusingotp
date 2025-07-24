import mongoose, { Schema } from "mongoose"

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        

    },
    otpExpiary:Date
},{timestamps:true})

 export const user=mongoose.model("user",userSchema)