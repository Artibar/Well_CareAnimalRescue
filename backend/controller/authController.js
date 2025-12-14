import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d',
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

   const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = new User({
      name,
      email,
      password,
      role: 'user',
    });

    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

export const login = async (req, res) => {
  console.log("Login request body:", req.body);
   try {
    const { userId, email, password, role } = req.body;
    const identifier = email || userId;
    if (!identifier || !password || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
  const user = await User.findByCredentials(identifier, role);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials, User not found'});
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials, Invalid password', error:'Invalid password' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '10d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: user.getPublicProfile(),
    });
    console.log("User Logged in:", user)
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getCurrentUser = async(req, res)=>{
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const logout = async (req, res) => {
  try {
    return res.json({ msg: "Logout successful (client should delete token)" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
