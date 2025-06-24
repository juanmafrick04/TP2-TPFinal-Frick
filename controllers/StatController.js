import {Stat, User} from "../Models/index.js";
import {validateToken } from "../utils/tokens.js";


class StatController{


  updateRecordNormal = async (req, res) => {
    const { value } = req.body;
    const userId = req.params.userId;

    try {
      const stats = await Stat.findOne({ where: { userId } });

      if (!stats) {
        console.log('Stats not found');
        return res.status(404).json({ success: false, message: 'Estadísticas no encontradas' });
      }

      if (value <= stats.recordNormal) {
        return res.json({ success: false, message: 'El nuevo record normal no es mayor al actual', stats });
      }

      await Stat.update({ recordNormal: value }, { where: { userId } });
      const updatedStats = await Stat.findOne({ where: { userId } });

      res.json({ success: true, message: 'Record normal actualizado', stats: updatedStats });
    } catch (error) {
      console.error('Error updating record normal:', error);
      res.status(500).json({ success: false, message: 'Error al actualizar el record normal' });
    }
  };
  

  updateRecordTimer = async (req, res) => {
    const { value } = req.body;
    const userId = req.params.userId;

    try {
      const stats = await Stat.findOne({ where: { userId } });

      if (!stats) {
        console.log('Stats not found');
        return res.status(404).json({ success: false, message: 'Estadísticas no encontradas' });
      }

      if (value <= stats.recordTimer) {
        return res.json({ success: false, message: 'El nuevo record timer no es mayor al actual', stats });
      }

      await Stat.update({ recordTimer: value }, { where: { userId } });
      const updatedStats = await Stat.findOne({ where: { userId } });
      
      res.json({ success: true, message: 'Record timer actualizado', stats: updatedStats });
    } catch (error) {
      console.error('Error updating record timer:', error);
      res.status(500).json({ success: false, message: 'Error al actualizar el record timer' });
    }
  };


  updateTotalGuesses = async (req, res) => {
    const { value } = req.body;
    const userId = req.params.userId;

    try {
      const stats = await Stat.findOne({ where: { userId } });

      if (!stats) {
        return res.status(404).json({ error: 'Estadísticas no encontradas' });
      }
  
      const newTotalGuesses = stats.totalGuesses + value;
      await Stat.update({totalGuesses: newTotalGuesses},{where: {userId}});
  
      res.json({ message: 'Total de adivinanzas actualizado', totalGuesses: newTotalGuesses });
    } catch (error) {
      console.error('Error updating record normal:', error);
      res.status(500).json({ success: false, message: 'Error al actualizar el record normal' });
    }
  };



// updateTotalGuesses = async (req, res) => {
//     const { additionalGuesses } = req.body;
//     const userId = req.user.id;
  
//     try {
//       const stats = await Stats.findOne({ where: { userId } });
  
//       if (!stats) {
//         return res.status(404).json({ error: 'Estadísticas no encontradas' });
//       }
  
//       const newTotalGuesses = stats.totalGuesses + additionalGuesses;
//       await Stats.update({totalGuesses: newTotalGuesses},{where: {userId}});
  
//       res.json({ message: 'Total de adivinanzas actualizado', totalGuesses: newTotalGuesses });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error al actualizar el total de adivinanzas' });
//     }
//   };
  


}

export default StatController;