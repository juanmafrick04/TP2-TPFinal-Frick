import { getUserRole } from "../models/User.js";

export const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const userRole = await getUserRole(req.user.email);

      if (userRole !== requiredRole) {
        return res.status(403).json({ error: "Access denied. Insufficient permissions." });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
