import React, { useState, useEffect } from 'react';
import PhotoList from '../Admin/PhotoList';
import ContactForm from './ContactForm';

const Home = () => {
  console.log('Home component rendered');
  const [visiblePhotos, setVisiblePhotos] = useState([]);

  useEffect(() => {
    const fetchVisiblePhotos = async () => {
      try {
        const response = await fetch('http://localhost:3002/photos/visible'); 
        if (!response.ok) {
          throw new Error('Errore nel recupero delle foto.');
        }
        const data = await response.json();
        setVisiblePhotos(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVisiblePhotos();
  }, []); // Dipendenza vuota per eseguire l'effetto solo al mount

  return (
    <div>
      <h1>Homepage Pubblica</h1>
      <PhotoList photos={visiblePhotos} />
      <ContactForm />
    </div>
  );
};

export default Home;
