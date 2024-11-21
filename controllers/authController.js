import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerUser, getUserByEmail } from "../models/User.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { email, username, password: hashedPassword };
    const result = await registerUser(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
