import db from "../config/firebase.js";

const PLAYLISTS_COLLECTION = "playlists";

export const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    const playlistRef = db.collection(PLAYLISTS_COLLECTION).doc();
    await playlistRef.set({
      name,
      owner: req.user.email,
      songs: [],
      sharedWith: [],
    });
    res.status(201).json({ message: "Playlist created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
