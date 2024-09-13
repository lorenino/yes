import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecurrenceManager() {
  const [recurrences, setRecurrences] = useState([]);
  const [nom, setNom] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadRecurrences();
  }, []);

  // Charger les récurrences depuis l'API
  const loadRecurrences = () => {
    axios.get('http://localhost:5000/api/recurrences')
      .then(response => setRecurrences(response.data))
      .catch(error => console.error('Erreur lors du chargement des récurrences', error));
  };

  // Ajouter une nouvelle récurrence
  const addRecurrence = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/recurrences', { nom })
      .then(() => {
        setMessage('Récurrence créée avec succès');
        setNom('');
        loadRecurrences(); // Recharger les récurrences après ajout
      })
      .catch(error => setMessage('Erreur lors de la création de la récurrence'));
  };

  // Supprimer une récurrence
  const deleteRecurrence = (id) => {
    axios.delete(`http://localhost:5000/api/recurrences/${id}`)
      .then(() => {
        setMessage('Récurrence supprimée avec succès');
        loadRecurrences(); // Recharger les récurrences après suppression
      })
      .catch(error => setMessage('Erreur lors de la suppression de la récurrence'));
  };

  return (
    <div>
      <h2>Gestion des Récurrences</h2>

      <form onSubmit={addRecurrence}>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom de la récurrence"
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      <ul>
        {recurrences.map((recurrence) => (
          <li key={recurrence.numero}>
            {recurrence.nom} 
            <button onClick={() => deleteRecurrence(recurrence.numero)}>Supprimer</button>
          </li>
        ))}
      </ul>

      {message && <p>{message}</p>}
    </div>
  );
}

export default RecurrenceManager;
