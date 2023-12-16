const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware isAdmin
const isAdmin = async (req, res, next) => {
  const userId = req.userId;

  try {
    // Recupera l'utente dal database utilizzando l'ID presente nel token
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Verifica se l'utente esiste e se è un amministratore
    if (!user || user.role !== 'admin') {
      console.error("Access denied. User:", user);
      return res.status(403).json({ error: 'Accesso non autorizzato. Solo gli amministratori possono accedere.' });
    }

    console.log("User is an administrator. User:", user);
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(500).json({ error: 'Errore nella verifica dell\'autorizzazione.' });
  }
};

module.exports = isAdmin;
