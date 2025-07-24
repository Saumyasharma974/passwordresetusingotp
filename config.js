import mongoose from "mongoose";

 export async function connectdb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/nodemailer");
    console.log("Connected to DB");
  } catch (error) {
    console.error(error);
  }
}

