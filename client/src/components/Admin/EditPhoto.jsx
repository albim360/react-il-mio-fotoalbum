import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const EditPhoto = ({ photoId }) => {
  const [photo, setPhoto] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Effetto per ottenere i dettagli della foto dal server
  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/photos/${photoId}`);
        setPhoto(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      } catch (error) {
        console.error('Errore durante il recupero dei dettagli della foto:', error);
      }
    };

    fetchPhotoDetails();
  }, [photoId]); // Dipendenza dell'effetto sul photoId

  // Funzione per gestire la modifica dei dettagli della foto
  const handleEditPhoto = async () => {
    try {
      // Effettua una richiesta al server per aggiornare le informazioni della foto
      await axios.put(`http://localhost:3002/${photoId}`, {
        title,
        description,
      });
      alert('Dettagli della foto aggiornati con successo!');
    } catch (error) {
      console.error('Errore durante l\'aggiornamento dei dettagli della foto:', error);
    }
  };

  return (
    <div>
      <h2>Modifica Foto</h2>
      <div>
        <label htmlFor="title">Titolo:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Descrizione:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={handleEditPhoto}>Salva Modifiche</button>
    </div>
  );
};

export default EditPhoto;
