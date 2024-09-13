import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SujetManager() {
  const [sujets, setSujets] = useState([]);
  const [nom, setNom] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadSujets();
  }, []);

  const loadSujets = () => {
    axios.get('http://localhost:5000/api/sujets')
      .then(response => setSujets(response.data))
      .catch(error => console.error('Erreur lors du chargement des sujets', error));
  };

  const addSujet = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/sujets', { nom })
      .then(() => {
        setMessage('Sujet créé avec succès');
        setNom('');
        loadSujets();
      })
      .catch(error => setMessage('Erreur lors de la création du sujet'));
  };

  const deleteSujet = (id) => {
    axios.delete(`http://localhost:5000/api/sujets/${id}`)
      .then(() => {
        setMessage('Sujet supprimé avec succès');
        loadSujets();
      })
      .catch(error => setMessage('Erreur lors de la suppression du sujet'));
  };

  return (
    <div>
      <h2>Gestion des Sujets</h2>

      <form onSubmit={addSujet}>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom du sujet"
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {sujets.map((sujet) => (
          <li key={sujet.numero}>
            {sujet.nom} 
            <button onClick={() => deleteSujet(sujet.numero)}>Supprimer</button>
          </li>
        ))}
      </ul>

      {message && <p>{message}</p>}
    </div>
  );
}

export default SujetManager;
