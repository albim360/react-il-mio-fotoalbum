const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const { isAdmin } = require('../middlewares/isAdmin');

// Middleware di autorizzazione
const authenticateUser = async (req, res, next) => {
  // Estrarre e verificare il token JWT dall'header della richiesta o da un cookie
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token non fornito. Accesso non autorizzato.' });
  }

  try {
    // Verifica e decodifica il token
    const decoded = jwt.verify(token, ''); 

    // Imposta l'ID dell'utente nella richiesta
    req.userId = decoded.userId;

    // Passa alla successiva funzione nel middleware
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token non valido. Accesso non autorizzato.' });
  }
};

// Applica il middleware di autenticazione a tutte le rotte che richiedono l'utente autenticato
router.use(authenticateUser);

// Rotta per assegnare il ruolo di admin a un utente
router.put('/make-admin/:userId', isAdmin, async (req, res) => {
  const { userId } = req.params;
  try {
    await prisma.user.update({
      where: { id: parseInt(userId, 10) },
      data: { isAdmin: true },
    });
    res.json({ message: 'L\'utente è stato promosso a amministratore.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante l\'assegnazione del ruolo di admin.' });
  }
});

// Rotta per rimuovere il ruolo di admin da un utente
router.put('/remove-admin/:userId', isAdmin, async (req, res) => {
    const { userId } = req.params;
    try {
      await prisma.user.update({
        where: { id: parseInt(userId, 10) },
        data: { isAdmin: false },
      });
      res.json({ message: 'L\'utente è stato rimosso dall\'amministratore.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Errore durante la rimozione del ruolo di admin.' });
    }
  });

module.exports = router;
