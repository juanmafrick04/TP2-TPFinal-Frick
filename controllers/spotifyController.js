import axios from "axios";

let spotifyToken = null;

export const authenticateSpotify = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    })
  );
  spotifyToken = response.data.access_token;
};

export const searchTracks = async (req, res) => {
  try {
    if (!spotifyToken) await authenticateSpotify();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${req.params.query}&type=track`,
      {
        headers: { Authorization: `Bearer ${spotifyToken}` },
      }
    );
    res.json(response.data.tracks.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
};

export const searchArtists = async (req, res) => {
  try {
    if (!spotifyToken) await authenticateSpotify();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${req.params.query}&type=artist`,
      {
        headers: { Authorization: `Bearer ${spotifyToken}` },
      }
    );
    res.json(response.data.artists.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artists" });
  }
};
