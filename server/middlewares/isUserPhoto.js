const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const isUserPhoto = async (req, res, next) => {
  const userId = req.userId;
  const photoId = req.params.photoId;

  try {
    const photo = await prisma.photo.findUnique({
      where: { id: parseInt(photoId, 10) },
    });

    if (!photo || (photo.userId !== userId && user.role !== 'admin')) {
      console.error("Access denied to the photo. User:", user);
      return res.status(403).json({ error: 'Accesso non autorizzato. Puoi modificare solo le tue foto.' });
    }

    console.log("User has access to the photo. User:", user);
    next();
  } catch (error) {
    console.error("Error in isUserPhoto middleware:", error);
    res.status(500).json({ error: 'Errore nella verifica dell\'autorizzazione.' });
  }
};

module.exports = isUserPhoto;
