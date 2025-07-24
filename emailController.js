import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { user } from './userModel.js';
import bcrypt from 'bcryptjs';
dotenv.config()
//otp generation

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
const transporter = nodemailer.createTransport({
 service:"Gmail",
 host: "smtp.gmail.com",
  port: 587, //
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },

 
});

export async function sendotpEmail(req, res) {
  const { email} = req.body;
  const otp = generateOTP();
  console.log(otp)

  try {
    // 1. Check if user already exists
    let existingUser = await user.findOne({ email });

   
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }


    // 2. Set OTP and expiry
    existingUser.otp = otp;
    existingUser.otpExpiary = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    console.log(existingUser.otp)
    // 3. Save user
    await existingUser.save();

    // 4. Send OTP via email
   const mailOptions = {
  from: process.env.EMAIL,
  to: email,
  subject: "🔐 OTP Verification - YourApp",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #2e6ee4;">Verify Your Email Address</h2>
      <p>Hello,</p>
      <p>Thank you for using our service. Use the following One-Time Password (OTP) to verify your identity:</p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #2e6ee4; background-color: #f1f5ff; padding: 10px 20px; border-radius: 6px; letter-spacing: 4px;">
          ${otp}
        </span>
      </div>

      <p>This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>

      <p>Regards,<br><strong>YourApp Team</strong></p>

      <hr style="margin-top: 30px;">
      <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
    </div>
  `
};

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP successfully sent!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP." });
  }
}

export async function verifyOtp(req, res) {
  console.log(req.body)
  const { email, otp } = req.body;

  const existingUser = await user.findOne({ email });
console.log(existingUser)
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (
    existingUser.otp === otp &&
    existingUser.otpExpiary > new Date()
  ) {
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
}


export async function resetPassword(req, res) {
  console.log(req.body)
  const { email, otp, newPassword } = req.body;

 
  const existingUser = await user.findOne({ email });

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (
    existingUser.otp !== otp ||
    existingUser.otpExpiary < new Date()
  ) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  existingUser.password = hashedPassword;
  existingUser.otp = null;
  existingUser.otpExpiary = null;

  await existingUser.save();
   try {
    await transporter.sendMail({
       from: process.env.EMAIL,
  to: email,
  subject: "🔐 Your Password Has Been Changed",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <h2 style="color: #2e6ee4;">Password Changed Successfully</h2>
      <p>Hello,</p>
      <p>This is a confirmation that your account password has been successfully changed.</p>

      <div style="margin: 20px 0; padding: 15px; background-color: #f2f2f2; border-left: 4px solid #2e6ee4;">
        <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 0;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <p>If you didn’t make this change, please contact our support team immediately.</p>

      <p>Regards,<br><strong>Your App Team</strong></p>

      <hr style="margin-top: 30px;">
      <p style="font-size: 12px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
    </div>
  `,

    });
  } catch (emailError) {
    console.error("Failed to send confirmation email:", emailError);
    // Don’t return error here, because password reset was already successful
  }

  res.status(200).json({ message: "Password reset successful" });
}




