export const logger =(req,res,next)=>{
    console.log("Todo perfecto desde el middleware");
    next()
  }

export const validatePositiveNumber = (req, res, next) => {
    const { value } = req.body;

    if (typeof value !== 'number' || value <= 0 || Number.isInteger(value) === false) {
      return res.status(400).json({ error: 'Valor inválido' });
    }
  
    next();
};