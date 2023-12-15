const { PrismaClient } = require('@prisma/client');
const { $executeRaw } = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

class UserController {
    static async signup(req, res) {
        const { username, email, password } = req.body;

        try {
            console.log('Inizio registrazione utente...');

            // Verifica se l'utente esiste già
            const existingUser = await prisma.user.findUnique({
                where: { email: email }, 
            });

            if (existingUser) {
                return res.status(400).json({ error: 'Utente già registrato con questa email.' });
            }

            // Cripta la password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crea un nuovo utente
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashedPassword,
                },
            });

            console.log('Fine registrazione utente. Nessun errore.');
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);

            if (error.code === 'P2002') {
                console.log('Errore di duplicazione di chiave univoca.');
                return res.status(400).json({ error: 'Utente già registrato con questa email.' });
            }

            console.log('Errore generale durante la registrazione.');
            res.status(500).json({ error: 'Errore durante la registrazione dell\'utente.' });
        }
    }
    static async signin(req, res) {
        const { email, password } = req.body;

        try {
            // Verifica se l'utente esiste
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });

            if (!existingUser) {
                return res.status(401).json({ error: 'Credenziali non valide.' });
            }

            // Verifica la password
            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Credenziali non valide.' });
            }

            // Genera il token JWT
            const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Invia il token come risposta
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Errore durante l\'accesso dell\'utente.' });
        }
    }
}

module.exports = UserController;