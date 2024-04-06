const express = require('express');
const router = express.Router();
const TrackerData = require('../models/trackerData');

router.route('/positions')
  .post(async (req, res) => {
    try {
      const positionData = req.body; // En supposant des données JSON provenant d'Arduino
      const newPosition = new TrackerData(positionData);
      await newPosition.save();
      res.status(201).send({ message: 'Données de position enregistrées avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erreur lors de l enregistrement des données de position' });
    }
  })
  .get(async (req, res) => {
    try {
      const positions = await TrackerData.find(); // Filtrer si besoin
      res.status(200).send(positions);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erreur lors de la récupération des données de position' });
    }
  });

  
  module.exports = router;