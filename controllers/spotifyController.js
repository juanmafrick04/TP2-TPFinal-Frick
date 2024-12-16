import axios from "axios";

// Variable global para el token de Spotify
let spotifyToken = null;

// Función para autenticar con Spotify
const authenticateSpotify = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    spotifyToken = response.data.access_token;
    console.log("Spotify authenticated successfully");
  } catch (error) {
    console.error("Error authenticating with Spotify:", error.message);
    throw new Error("Failed to authenticate with Spotify");
  }
};

// Middleware para asegurar que Spotify esté autenticado
const ensureSpotifyToken = async () => {
  if (!spotifyToken) {
    await authenticateSpotify();
  }
};

// Controlador para buscar canciones
export const searchTracks = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    await ensureSpotifyToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      }
    );

    res.status(200).json(response.data.tracks.items);
  } catch (error) {
    console.error("Error fetching tracks:", error.message);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
};

// Controlador para buscar artistas
export const searchArtists = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query || query.trim() === "") {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    await ensureSpotifyToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${spotifyToken}`,
        },
      }
    );

    res.status(200).json(response.data.artists.items);
  } catch (error) {
    console.error("Error fetching artists:", error.message);
    res.status(500).json({ error: "Failed to fetch artists" });
  }
};

// Controlador para obtener los detalles de una canción
export const getTrackDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id.trim() === "") {
      return res.status(400).json({ error: "Track ID is required" });
    }

    await ensureSpotifyToken();

    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching track details:", error.message);
    res.status(500).json({ error: "Failed to fetch track details" });
  }
};

