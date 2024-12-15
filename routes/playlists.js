import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createPlaylist, getUserPlaylists, addSongToPlaylist, removeSongFromPlaylist, sharePlaylist } from "../controllers/playlistsController.js";

const router = express.Router();

router.post("/", protect, createPlaylist); // Crear lista de reproducción
router.get("/", protect, getUserPlaylists); // Obtener listas del usuario
router.post("/:id", protect, addSongToPlaylist); // Agregar canción a una lista
router.delete("/:id", protect, removeSongFromPlaylist); // Eliminar canción de una lista
router.post("/share/:id", protect, sharePlaylist); // Compartir lista con otro usuario

export default router;
