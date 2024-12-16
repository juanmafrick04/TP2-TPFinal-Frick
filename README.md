# TP2-TPFinal-Frick

Resumen de los Endpoints

POST	/api/auth/register	Registrar un nuevo usuario
POST	/api/auth/login	Iniciar sesión
GET	/api/spotify/search/tracks/:query	Buscar canciones en Spotify
GET	/api/spotify/search/artists/:query	Buscar artistas en Spotify
GET	/api/spotify/tracks/:id	Obtener detalles de una canción
POST	/api/playlists	Crear una lista de reproducción
GET	/api/playlists	Obtener listas de reproducción del usuario
POST	/api/playlists/:id	Agregar canción a una lista
DELETE	/api/playlists/:id	Eliminar canción de una lista
POST	/api/playlists/share/:id	Compartir lista con otro usuario
POST	/api/admin/update-role	Actualizar rol de un usuario
GET	/api/admin/stats	Obtener estadísticas globales