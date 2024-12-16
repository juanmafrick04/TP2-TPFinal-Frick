import db from "../config/firebase.js";

// Colección para almacenar las listas de reproducción
const PLAYLISTS_COLLECTION = "playlists";

/**
 * Crear una nueva lista de reproducción
 * @param {Request} req
 * @param {Response} res
 */
export const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Playlist name is required" });
    }

    const playlistRef = db.collection(PLAYLISTS_COLLECTION).doc();
    await playlistRef.set({
      id: playlistRef.id,
      name,
      owner: req.user.email, // Usuario autenticado
      songs: [],
      sharedWith: [],
    });

    res.status(201).json({ message: "Playlist created successfully", id: playlistRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Obtener todas las listas de reproducción del usuario autenticado
 * @param {Request} req
 * @param {Response} res
 */
export const getUserPlaylists = async (req, res) => {
  try {
    const playlistsSnapshot = await db
      .collection(PLAYLISTS_COLLECTION)
      .where("owner", "==", req.user.email)
      .get();

    const playlists = playlistsSnapshot.docs.map((doc) => doc.data());

    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Agregar una canción a una lista de reproducción
 * @param {Request} req
 * @param {Response} res
 */
export const addSongToPlaylist = async (req, res) => {
  try {
    const { id } = req.params; // ID de la lista
    const { song } = req.body; // Información de la canción

    if (!song || !song.spotifyId || !song.title || !song.artist) {
      return res.status(400).json({ error: "Invalid song data" });
    }

    const playlistRef = db.collection(PLAYLISTS_COLLECTION).doc(id);
    const playlistDoc = await playlistRef.get();

    if (!playlistDoc.exists) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const playlist = playlistDoc.data();
    playlist.songs.push(song);

    await playlistRef.update({ songs: playlist.songs });

    res.status(200).json({ message: "Song added to playlist successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Eliminar una canción de una lista de reproducción
 * @param {Request} req
 * @param {Response} res
 */
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { id } = req.params; // ID de la lista
    const { spotifyId } = req.body; // ID de la canción en Spotify

    if (!spotifyId) {
      return res.status(400).json({ error: "Spotify ID is required" });
    }

    const playlistRef = db.collection(PLAYLISTS_COLLECTION).doc(id);
    const playlistDoc = await playlistRef.get();

    if (!playlistDoc.exists) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const playlist = playlistDoc.data();
    const updatedSongs = playlist.songs.filter((song) => song.spotifyId !== spotifyId);

    await playlistRef.update({ songs: updatedSongs });

    res.status(200).json({ message: "Song removed from playlist successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Compartir una lista de reproducción con otro usuario
 * @param {Request} req
 * @param {Response} res
 */
export const sharePlaylist = async (req, res) => {
  try {
    const { id } = req.params; // ID de la lista
    const { email } = req.body; // Email del usuario con quien compartir

    if (!email) {
      return res.status(400).json({ error: "Email is required to share playlist" });
    }

    const playlistRef = db.collection(PLAYLISTS_COLLECTION).doc(id);
    const playlistDoc = await playlistRef.get();

    if (!playlistDoc.exists) {
      return res.status(404).json({ error: "Playlist not found" });
    }

    const playlist = playlistDoc.data();

    if (playlist.owner !== req.user.email) {
      return res.status(403).json({ error: "You do not have permission to share this playlist" });
    }

    if (!playlist.sharedWith.includes(email)) {
      playlist.sharedWith.push(email);
      await playlistRef.update({ sharedWith: playlist.sharedWith });
    }

    res.status(200).json({ message: "Playlist shared successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

