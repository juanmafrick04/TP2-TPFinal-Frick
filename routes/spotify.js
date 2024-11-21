import express from "express";
import { searchTracks, searchArtists } from "../controllers/spotifyController.js";

const router = express.Router();

router.get("/search/tracks/:query", searchTracks);
router.get("/search/artists/:query", searchArtists);

export default router;

