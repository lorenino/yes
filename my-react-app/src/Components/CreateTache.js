import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateTache() {
  const [nom, setNom] = useState('');
  const [recurrenceId, setRecurrenceId] = useState('');
  const [sujetId, setSujetId] = useState('');
  const [recurrences, setRecurrences] = useState([]);
  const [sujets, setSujets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Charger les récurrences et les sujets pour le formulaire
    axios.get('http://localhost:5000/api/recurrences')
      .then(response => setRecurrences(response.data))
      .catch(error => console.error('Erreur lors du chargement des récurrences', error));

    axios.get('http://localhost:5000/api/sujets')
      .then(response => setSujets(response.data))
      .catch(error => console.error('Erreur lors du chargement des sujets', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoyer la nouvelle tâche à l'API
    axios.post('http://localhost:5000/api/taches', { nom, recurrenceId, sujetId })
      .then(response => {
        setMessage('Tâche créée avec succès');
        setNom('');
        setRecurrenceId('');
        setSujetId('');
      })
      .catch(error => {
        console.error('Erreur lors de la création de la tâche', error);
        setMessage('Erreur lors de la création de la tâche');
      });
  };

  return (
    <div>
      <h2>Créer une nouvelle Tâche</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom de la tâche :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Récurrence :</label>
          <select
            value={recurrenceId}
            onChange={(e) => setRecurrenceId(e.target.value)}
            required
          >
            <option value="">Sélectionner une récurrence</option>
            {recurrences.map((recurrence) => (
              <option key={recurrence.numero} value={recurrence.numero}>
                {recurrence.nom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sujet :</label>
          <select
            value={sujetId}
            onChange={(e) => setSujetId(e.target.value)}
            required
          >
            <option value="">Sélectionner un sujet</option>
            {sujets.map((sujet) => (
              <option key={sujet.numero} value={sujet.numero}>
                {sujet.nom}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Créer la tâche</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateTache;
