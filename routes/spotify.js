import express from "express";
import { searchTracks, searchArtists, getTrackDetails } from "../controllers/spotifyController.js";

const router = express.Router();

// Rutas para Spotify
router.get("/search/tracks/:query", searchTracks); // Buscar canciones
router.get("/search/artists/:query", searchArtists); // Buscar artistas
router.get("/tracks/:id", getTrackDetails); // Obtener detalles de una canción

export default router;

