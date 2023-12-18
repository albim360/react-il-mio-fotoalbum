// Importa le librerie necessarie
import React, { useState } from 'react';
import axios from 'axios'; 

// Definisci il componente AddPhoto
const AddPhoto = () => {
  // Stati per gestire i dati del form
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  // Gestisci la modifica del titolo
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Gestisci il caricamento dell'immagine
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Gestisci l'invio del form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un oggetto FormData per inviare i dati
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    

    try {
      // Invia la richiesta al server utilizzando axios
      const response = await axios.post('http://localhost:3002/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Esegui le azioni necessarie dopo il successo (ad esempio, aggiorna lo stato)
      console.log('Immagine aggiunta con successo:', response.data);

      // Pulisci il form
      setTitle('');
      setImage(null);
    } catch (error) {
      console.error('Errore durante l\'aggiunta dell\'immagine:', error);
    }
  };

  return (
    <div>
      <h2>Aggiungi Foto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titolo:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Immagine:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Aggiungi Foto</button>
      </form>
    </div>
  );
};

export default AddPhoto;
