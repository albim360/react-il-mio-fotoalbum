const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.static('public', { extensions: ['html', 'js'] }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/admin', adminRoutes);
app.use('/', authRoutes);
app.use('/photos', photoRoutes);
app.use('/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.send('Benvenuto nel mio server Express!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server online su: http://localhost:${port}`);
});
