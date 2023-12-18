import React, { useState, useEffect } from 'react';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchPhotos = async () => {
        try {
          const response = await fetch('http://localhost:3002/photos');
          
          if (!response.ok) {
            throw new Error('Errore nel recupero delle foto.');
          }
  
          const data = await response.json();
          setPhotos(data);
        } catch (error) {
          setError('Si è verificato un errore durante il recupero delle foto.');
          console.error(error);
        }
      };
  
      fetchPhotos();
    }, []); // Dipendenza vuota per eseguire l'effetto solo al mount
  
    return (
      <div>
        <h1>Lista delle Foto</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {photos.map((photo) => (
            <li key={photo.id}>
              <img src={photo.image} alt={photo.title} style={{ maxWidth: '200px' }} />
              <p><strong>Titolo:</strong> {photo.title}</p>
              <p><strong>Descrizione:</strong> {photo.description}</p>
              <p><strong>Categoria:</strong> {photo.category}</p>
              <p><strong>Immagine:</strong> {photo.image}</p>
              {/* Estrarre le informazioni utente necessarie */}
              <p><strong>Utente:</strong> {photo.user.username}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default PhotoList;