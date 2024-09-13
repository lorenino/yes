import axios from 'axios';

// Définir la base URL de ton serveur Express
const API_URL = 'http://localhost:5000/api';

// Fonction pour obtenir toutes les tâches
export const fetchTaches = () => {
  return axios.get(`${API_URL}/taches`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching taches:', error);
      throw error;
    });
};

// Fonction pour obtenir toutes les recurrences
export const fetchRecurrences = () => {
  return axios.get(`${API_URL}/recurrences`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching recurrences:', error);
      throw error;
    });
};

// Fonction pour obtenir tous les sujets
export const fetchSujets = () => {
  return axios.get(`${API_URL}/sujets`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching sujets:', error);
      throw error;
    });
};

// Fonction pour obtenir tous les jours
export const fetchJours = () => {
  return axios.get(`${API_URL}/jours`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching jours:', error);
      throw error;
    });
};

// Fonction pour obtenir toutes les semaines
export const fetchSemaines = () => {
  return axios.get(`${API_URL}/semaines`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching semaines:', error);
      throw error;
    });
};
