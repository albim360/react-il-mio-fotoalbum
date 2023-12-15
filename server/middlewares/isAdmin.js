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
