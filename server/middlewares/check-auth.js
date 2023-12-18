const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Estrai il token dall'header Authorization
    const token = req.headers.authorization.split(' ')[1];
    
    // Verifica il token utilizzando la chiave segreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Aggiungi i dati decodificati alla richiesta
    req.userData = decoded;
    
    // Passa al middleware successivo
    next();
  } catch (error) {
    // Se la verifica del token fallisce, restituisci un errore di autenticazione
    return res.status(401).json({
      message: 'Autenticazione fallita',
    });
  }
};
