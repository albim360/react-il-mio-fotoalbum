const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Rotte API per le categorie
router.post('/', async (req, res) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name: req.body.name,
      },
    });

    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella creazione della categoria.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella lettura delle categorie.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return res.status(404).json({ error: 'Categoria non trovata.' });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella lettura della categoria.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return res.status(404).json({ error: 'Categoria non trovata.' });
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: req.body.name || existingCategory.name,
      },
    });

    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella modifica della categoria.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existingCategory) {
      return res.status(404).json({ error: 'Categoria non trovata.' });
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    res.json({ message: 'Categoria eliminata con successo.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella cancellazione della categoria.' });
  }
});

module.exports = router;
