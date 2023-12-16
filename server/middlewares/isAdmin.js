const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];

    if (!token) {
      console.error("Token not found in the request headers.");
      return res.status(401).json({ error: 'Accesso non autorizzato. L\'utente non è autenticato.' });
    }

    console.log("Received token:", token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    if (!userId) {
      console.error("User ID not found in the token.");
      return res.status(401).json({ error: 'Accesso non autorizzato. L\'utente non è autenticato.' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || (user && user.role !== 'admin')) {
      console.error("Access denied. User:", user);
      return res.status(403).json({ error: 'Accesso non autorizzato. Solo gli amministratori possono accedere.' });
    }

    console.log("User is an administrator. User:", user);
    req.userId = userId;
    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(500).json({ error: 'Errore nella verifica dell\'autorizzazione.' });
  }
};


module.exports = isAdmin;
