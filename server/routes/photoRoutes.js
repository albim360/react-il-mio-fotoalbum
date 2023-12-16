const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Creazione di una nuova foto
router.post('/', async (req, res) => {
  try {
    const categoriesToConnect = Array.isArray(req.body.categories) 
    ? req.body.categories 
    : [];

    await prisma.photo.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            visible: req.body.visible,
            categories: {
                connect: categoriesToConnect.map(categoryId => ({ id: categoryId })),
            },
            userId: req.body.userId,
        }
    });
    

    // Rispondi con successo
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella creazione della foto.', details: error.message });
  }
});



// Lettura di tutte le foto
router.get('/', async (req, res) => {
  try {
    const allPhotos = await prisma.photo.findMany({
      include: { categories: true, user: true },
    });

    res.json(allPhotos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella lettura delle foto.' });
  }
});

// Lettura di una singola foto
router.get('/:id', async (req, res) => {
  try {
    const photoId = parseInt(req.params.id);

    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
      include: { categories: true, user: true },
    });

    if (!photo) {
      return res.status(404).json({ error: 'Foto non trovata.' });
    }

    res.json(photo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella lettura della foto.' });
  }
});

// Aggiornamento di una foto
router.put('/:id', async (req, res) => {
  try {
    const photoId = parseInt(req.params.id);

    const existingPhoto = await prisma.photo.findUnique({
      where: { id: photoId },
    });

    if (!existingPhoto) {
      return res.status(404).json({ error: 'Foto non trovata.' });
    }

    const updatedPhoto = await prisma.photo.update({
      where: { id: photoId },
      data: {
        title: req.body.title || existingPhoto.title,
        description: req.body.description || existingPhoto.description,
        image: req.body.image || existingPhoto.image,
        visible: req.body.visible !== undefined ? req.body.visible : existingPhoto.visible,
        categories: {
          connect: req.body.categories?.map((categoryId) => ({ id: categoryId })),
        },
      },
    });

    res.json(updatedPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella modifica della foto.' });
  }
});


// Eliminazione di una foto
router.delete('/:id', async (req, res) => {
  try {
    const photoId = parseInt(req.params.id);

    const deletedPhoto = await prisma.photo.delete({
      where: { id: photoId },
    });

    res.json(deletedPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella cancellazione della foto.' });
  }
});

process.on('beforeExit', () => {
  prisma.$disconnect();
});

module.exports = router;
