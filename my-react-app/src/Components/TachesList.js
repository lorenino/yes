import React, { useEffect, useState } from 'react';
import { fetchTaches } from '../api';

function TachesList() {
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTaches()
      .then(data => {
        setTaches(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Liste des Tâches</h1>
      <ul>
        {taches.map(tache => (
          <li key={tache.numero}>
            {tache.nom} - {tache.recurrence ? tache.recurrence.nom : 'No recurrence'} - {tache.sujet ? tache.sujet.nom : 'No subject'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TachesList;
