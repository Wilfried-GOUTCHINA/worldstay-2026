const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apartmentRoutes = require('./routes/apartments');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/apartments', apartmentRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'WorldStay API — Coupe du Monde 2026 ⚽' });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
