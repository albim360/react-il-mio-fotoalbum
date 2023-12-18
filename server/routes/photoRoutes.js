const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const isAdmin = require('../middlewares/isAdmin');
const isUserPhoto = require('../middlewares/isUserPhoto');

// Creazione di una nuova foto
router.post('/', async (req, res) => {
  try {
    const categoriesToConnect = Array.isArray(req.body.categories) 
    ? req.body.categories 
    : [];

    const newPhoto = await prisma.photo.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        visible: req.user?.role === 'admin' ? req.body.visible : false,
        categories: {
          connect: categoriesToConnect.map(categoryId => ({ id: categoryId })),
        },
        userId: req.body.userId,
      }
    });
    
    // Rispondi con la nuova foto creata
    res.json(newPhoto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella creazione della foto.', details: error.message });
  }
});

// Lettura di tutte le foto per l'amministratore
router.get('/admin', isAdmin, async (req, res) => {
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

// Lettura di tutte le foto visibili
router.get('/visible', async (req, res) => {
  try {
    const visiblePhotos = await prisma.photo.findMany({
      where: {
        visible: true,
      },
      include: { categories: true, user: true },
    });
    res.json(visiblePhotos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella lettura delle foto visibili.' });
  }
});


// Lettura di tutte le foto per gli utenti non amministratori
router.get('/', async (req, res) => {
  try {
    const user = req.user;
    const userPhotos = await prisma.photo.findMany({
      where: {
        userId: user?.id,
        visible: true,
      },
      include: { categories: true, user: true },
    });
    res.json(userPhotos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella lettura delle foto.' });
  }
});

// Aggiornamento di una foto
router.put('/:id', isAdmin, isUserPhoto, async (req, res) => {
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
router.delete('/:id', isAdmin, isUserPhoto, async (req, res) => {
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

module.exports = router;
