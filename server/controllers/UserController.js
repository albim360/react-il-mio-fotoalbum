const { PrismaClient } = require('@prisma/client');
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
                console.log('Utente già registrato con questa email.');
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
            console.error('Errore durante la registrazione:', error);

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
                console.log('Utente non trovato con questa email.');
                return res.status(401).json({ error: 'Credenziali non valide.' });
            }

            // Verifica la password
            const passwordMatch = await bcrypt.compare(password, existingUser.password);

            if (!passwordMatch) {
                console.log('Password non corrispondente.');
                return res.status(401).json({ error: 'Credenziali non valide.' });
            }

            // Genera il token JWT
            const token = jwt.sign({ userId: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log("Generated token:", token);

            // Invia il token come risposta
            res.json({ token });
        } catch (error) {
            console.error('Errore durante l\'accesso:', error);
            res.status(500).json({ error: 'Errore durante l\'accesso dell\'utente.' });
        }
    }

    static async getAuthenticatedUser(req, res) {
        const userId = req.user.userId; // Dovrebbe contenere l'ID dell'utente estratto dal token JWT

        try {
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                console.log('Utente non trovato.');
                return res.status(404).json({ error: 'Utente non trovato.' });
            }

            res.json({ user });
        } catch (error) {
            console.error('Errore nel recupero dell\'utente autenticato:', error);
            res.status(500).json({ error: 'Errore nel recupero dell\'utente autenticato.' });
        }
    }
}

module.exports = UserController;
