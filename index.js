// server.js or index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectdb } from "./config.js";
import { resetPassword, sendotpEmail, verifyOtp } from "./emailController.js";
import { login, register } from "./usercontroller.js";


dotenv.config();
const app = express();

// DB Connect
connectdb();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ FIXED ROUTE
app.post("/send-otp", sendotpEmail);
app.post("/register",register)
app.post("/login",login)
app.post("/verify-otp",verifyOtp)
app.post("/reset-password",resetPassword)

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
