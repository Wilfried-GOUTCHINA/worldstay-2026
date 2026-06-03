const apartments = require('../models/Apartment');

// GET /api/apartments
const getAll = (req, res) => {
  const { available } = req.query;
  let result = apartments;
  if (available === 'true') result = result.filter(a => a.available);
  res.json({ count: result.length, data: result });
};

// GET /api/apartments/country/:c
const getByCountry = (req, res) => {
  const result = apartments.filter(a => a.country === req.params.c);
  res.json({ count: result.length, data: result });
};

// GET /api/apartments/city/:city
const getByCity = (req, res) => {
  const result = apartments.filter(a =>
    a.city.toLowerCase().includes(req.params.city.toLowerCase())
  );
  res.json({ count: result.length, data: result });
};

// GET /api/apartments/:id
const getById = (req, res) => {
  const apt = apartments.find(a => a.id === parseInt(req.params.id));
  if (!apt) return res.status(404).json({ message: 'Appartement non trouvé' });
  res.json(apt);
};

module.exports = { getAll, getByCountry, getByCity, getById };
