const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

// Importer les modèles
const Sujet = require('./models/Sujet');
const Taches = require('./models/Taches');
const Jours = require('./models/Jours');
const Semaine = require('./models/Semaine');

// Liste des récurrences prédéfinies
const predefinedRecurrences = [
  { id: 1, nom: 'Hebdomadaire' },
  { id: 2, nom: 'Mensuel' },
  { id: 3, nom: 'Bimensuelle' }
];

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello from the server!</h1>');
});

// Route pour créer une nouvelle tâche
app.post('/api/taches', async (req, res) => {
  const { nom, recur_type, sujet_id } = req.body;

  try {
    const newTache = await Taches.create({ nom, recur_type, sujet_id });
    res.status(201).json(newTache);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la tâche' });
  }
});

// Route pour obtenir toutes les tâches
app.get('/api/taches', async (req, res) => {
  try {
    const taches = await Taches.findAll(); // Assure-toi que cette méthode existe et fonctionne
    res.json(taches);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
  }
});

// Route pour obtenir les récurrences prédéfinies
app.get('/api/recurrences', async (req, res) => {
  res.json(predefinedRecurrences);
});

// Route pour obtenir tous les sujets
app.get('/api/sujets', async (req, res) => {
  try {
    const sujets = await Sujet.findAll();
    res.json(sujets);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Route pour créer un nouveau sujet
app.post('/api/sujets', async (req, res) => {
  const { nom } = req.body;

  try {
    const newSujet = await Sujet.create({ nom });
    res.status(201).json(newSujet);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du sujet' });
  }
});


// Synchroniser les modèles avec la base de données
const sequelize = require('./models/db');

sequelize.sync().then(() => {
  console.log('Database & tables created!');
}).catch((error) => {
  console.error('Error syncing database:', error);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
