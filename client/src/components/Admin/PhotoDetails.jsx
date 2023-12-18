import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const PhotoDetail = ({ photoId }) => {
  const [photo, setPhoto] = useState({});

  // Effetto per ottenere i dettagli della foto dal server
  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002(photos/${photoId}`);
        setPhoto(response.data);
      } catch (error) {
        console.error('Errore durante il recupero dei dettagli della foto:', error);
      }
    };

    fetchPhotoDetails();
  }, [photoId]); // Dipendenza dell'effetto sul photoId

  return (
    <div>
      <h2>Dettagli Foto</h2>
      <div>
        <strong>Titolo:</strong> {photo.title}
      </div>
      <div>
        <strong>Descrizione:</strong> {photo.description}
      </div>
      <div>
      <img src={photo.imageUrl} alt={photo.title} />
      </div>
    </div>
  );
};

export default PhotoDetail;
