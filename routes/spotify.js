import express from "express";
import { searchTracks, searchArtists, getTrackDetails } from "../controllers/spotifyController.js";

const router = express.Router();

// Rutas para Spotify
router.get("/search/tracks/:query", searchTracks); 
router.get("/search/artists/:query", searchArtists); 
router.get("/tracks/:id", getTrackDetails); 

export default router;

