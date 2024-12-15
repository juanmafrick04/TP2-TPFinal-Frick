import db from "../config/firebase.js";
import bcrypt from "bcryptjs";

const USERS_COLLECTION = "users";

export const registerUser = async (userData) => {
  const userRef = db.collection(USERS_COLLECTION).doc(userData.email);
  const userDoc = await userRef.get();

  if (userDoc.exists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  await userRef.set({ ...userData, password: hashedPassword });
  return { message: "User registered successfully" };
};

export const getUserByEmail = async (email) => {
  const userDoc = await db.collection(USERS_COLLECTION).doc(email).get();
  if (!userDoc.exists) {
    throw new Error("User not found");
  }
  return userDoc.data();
};

export const getUserRole = async (email) => {
  const userDoc = await db.collection(USERS_COLLECTION).doc(email).get();
  if (!userDoc.exists) {
    throw new Error("User not found");
  }
  return userDoc.data().role;
};

