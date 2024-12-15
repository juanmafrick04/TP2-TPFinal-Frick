import jwt from "jsonwebtoken";
import { registerUser, getUserByEmail } from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const result = await registerUser({ email, username, password });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
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

export const registerAdmin = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Verifica que el usuario que realiza esta acción sea admin
    const requesterRole = await getUserRole(req.user.email);
    if (requesterRole !== "admin") {
      return res.status(403).json({ error: "Only admins can create new admins." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { email, username, password: hashedPassword, role: "admin" };

    const result = await registerUser(userData);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  const { email, role } = req.body;

  try {
    // Verifica que el usuario que realiza esta acción sea admin
    const requesterRole = await getUserRole(req.user.email);
    if (requesterRole !== "admin") {
      return res.status(403).json({ error: "Only admins can update user roles." });
    }

    const userRef = db.collection(USERS_COLLECTION).doc(email);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    await userRef.update({ role });
    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
