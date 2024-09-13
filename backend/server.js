const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

// Importer les modèles
const Recurrence = require('./models/Recurrence');
const Sujet = require('./models/Sujet');
const Taches = require('./models/Taches');
const Jours = require('./models/Jours');
const Semaine = require('./models/Semaine');

app.use(cors());


// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Hello from the server!</h1>');
});

// Route pour obtenir toutes les tâches
app.get('/api/taches', async (req, res) => {
  try {
    const taches = await Taches.findAll({
      include: [Recurrence, Sujet]
    });
    res.json(taches);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour obtenir toutes les recurrences
app.get('/api/recurrences', async (req, res) => {
  try {
    const recurrences = await Recurrence.findAll();
    res.json(recurrences);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour créer une nouvelle récurrence
app.post('/api/recurrences', async (req, res) => {
    const { nom } = req.body;
  
    try {
      const newRecurrence = await Recurrence.create({ nom });
      res.status(201).json(newRecurrence);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création de la récurrence' });
    }
  });
  
  // Route pour supprimer une récurrence
  app.delete('/api/recurrences/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Recurrence.destroy({ where: { numero: id } });
      res.status(200).json({ message: 'Récurrence supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de la récurrence' });
    }
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
  
  // Route pour supprimer un sujet
  app.delete('/api/sujets/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      await Sujet.destroy({ where: { numero: id } });
      res.status(200).json({ message: 'Sujet supprimé avec succès' });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression du sujet' });
    }
  });
  

// Route pour obtenir tous les jours
app.get('/api/jours', async (req, res) => {
  try {
    const jours = await Jours.findAll({
      include: [Taches]
    });
    res.json(jours);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour obtenir toutes les semaines
app.get('/api/semaines', async (req, res) => {
  try {
    const semaines = await Semaine.findAll({
      include: [Jours]
    });
    res.json(semaines);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// Route pour créer une nouvelle tâche
app.post('/api/taches', async (req, res) => {
    const { nom, recurrenceId, sujetId } = req.body;
  
    try {
      // Créer une nouvelle tâche
      const newTache = await Taches.create({
        nom,
        recurrenceId,
        sujetId
      });
      res.status(201).json(newTache);
    } catch (error) {
      res.status(500).send('Erreur lors de la création de la tâche : ' + error.message);
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
