const express = require('express');
const router = express.Router();
const {
  getAll,
  getByCountry,
  getByCity,
  getById
} = require('../controllers/apartmentController');

router.get('/',           getAll);
router.get('/country/:c', getByCountry);
router.get('/city/:city', getByCity);
router.get('/:id',        getById);

module.exports = router;
