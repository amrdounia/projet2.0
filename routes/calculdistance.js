const express = require('express');
const router = express.Router();
const haversine = require('haversine');
const Vehicle = require('../models/distance'); // Assuming 'distance' is the correct model name

// Route for calculating distance
router.post('/calculerDistance', async (req, res) => {
  try {
    // Validation of input data (enhanced)
    const newvehicleId  = req.body.vehicleId;
    const newstartLocation = req.body.startLocation;
     const newendLocation = req.body.endLocation;
     const newVehicle = new Vehicle();
    if (!newvehicleId || !newstartLocation || !newendLocation ) {
      throw new Error('Données d\'entrée invalides'); // Throw for centralized handling
    }

    // Calculate distance with haversine
    const distance = haversine(newstartLocation, newendLocation);

    // Check if distance is valid
    if (isNaN(distance)) {
      throw new Error('Coordonnées de localisation invalides');
    }

    // Create a new Vehicle instance (use spread operator for clarity)
    newVehicle.vehicleId= newvehicleId;
    newVehicle.startLocation = newstartLocation;
    newVehicle.endLocation = newendLocation;
      newVehicle.distanceTraveled= distance;
  

    // Save the vehicle and handle potential errors
    const savedVehicle = await newVehicle.save();
    if (!savedVehicle) {
      throw new Error('Erreur lors de l\'enregistrement du véhicule');
    }

    // Send successful response
    res.json({ distance });
  } catch (error) {
    console.error(error.message); // Log the error for debugging
    res.status(400).send('Données d\'entrée invalides ou erreur lors de l\'enregistrement'); // Provide informative error message
  }
});

module.exports = router;
