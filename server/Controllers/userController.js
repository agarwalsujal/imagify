import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
      if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
        const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 

    // Hash the password
    

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
   const user = await newUser.save();
const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET
    );
    res.status(201).json({success: true, token,user: { name: user.name } });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }else {
      console.log("User logged in successfully");
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET
    );

    res.status(200).json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}
const userCredits = async (req, res) => {
  const { userId } = req.user; // Get user ID from request (assumed to be set by auth middleware)

  try {
    // Find user by ID
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Return user's credit balance
    res.status(200).json({ success: true, credits: user.creditBalance, user: { name: user.name } });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export { registerUser, loginUser, userCredits };