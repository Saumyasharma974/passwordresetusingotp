import bcrypt from "bcryptjs";
import { user } from "./userModel.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate token with only user ID and email
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
      token,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Check if user exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // 4. Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5. Send response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        email: existingUser.email,
      },
      token,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

