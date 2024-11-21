import express from "express";
import { searchTracks } from "../controllers/spotifyController.js";

const router = express.Router();

router.get("/search/:query", searchTracks);

export default router;
