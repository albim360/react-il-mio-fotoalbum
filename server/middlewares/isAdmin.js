// Middleware per verificare se l'utente è un amministratore
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next(); 
    } else {
      res.status(403).json({ error: 'Accesso negato. Solo gli amministratori possono eseguire questa azione.' });
    }
  };
  
  router.post('/make-admin', isAdmin, async (req, res) => {
    
  });
  