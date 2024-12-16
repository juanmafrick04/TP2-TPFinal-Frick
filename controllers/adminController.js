export const updateUserRole = async (req, res) => {
  try {
    const { email, role } = req.body;
    // Aquí debería ir la lógica para actualizar el rol del usuario
    res.status(200).json({ message: `Role for ${email} updated to ${role}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getGlobalStats = async (req, res) => {
  try {
    // Aquí debería ir la lógica para obtener estadísticas globales
    res.status(200).json({ message: "Global stats retrieved successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
