const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Middleware di autorizzazione
const isAdmin = async (req, res, next) => {
  const userId = req.userId; 
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Accesso non autorizzato. Solo gli amministratori possono accedere.' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella verifica dell\'autorizzazione.' });
  }
};

// Rotta per assegnare il ruolo di admin a un utente
router.post('/make-admin/:userId', isAdmin, async (req, res) => {
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
router.post('/remove-admin/:userId', isAdmin, async (req, res) => {
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
