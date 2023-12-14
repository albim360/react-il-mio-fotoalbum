const express = require('express');
const cors = require('cors');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.static('public'));

// Middleware per l'analisi del corpo delle richieste in formato JSON
app.use(express.json());

// // Rotte per i post
// app.use('/', routes);

// Rotte per l'autenticazione
app.use('/', authRoutes);

// Route di base per la radice
app.get('/', (req, res) => {
  res.send('Benvenuto nel mio server Express!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server online su: http://localhost:${port}`);
});