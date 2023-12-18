import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

const Categories = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  // Effetto per ottenere la lista delle categorie dal server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3002/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Errore durante il recupero delle categorie:', error);
      }
    };

    fetchCategories();
  }, []); // L'array vuoto come dipendenza assicura che l'effetto venga eseguito solo al mount

  return (
    <div>
      <h2>Categorie</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            style={{ cursor: 'pointer', fontWeight: category.id === selectedCategory ? 'bold' : 'normal' }}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
