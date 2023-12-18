import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('http://localhost:3002/user');
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3002/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Salvo il token in localStorage 
      setUser({ email }); 
      console.log('Login effettuato con successo!');
      console.log('Token salvato in localStorage:', localStorage.getItem('token'));
    } catch (error) {
      console.error('Errore durante il login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
