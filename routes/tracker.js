const express = require("express");
const router = express.Router();
const User = require("../models/users");

// Route pour recevoir les données de position
router.post("/position", async (req, res) => {
  const { latitude, longitude } = req.body;
  const user = await User.findById(req.userId);

  // Mettre à jour la position du véhicule de l'utilisateur
  user.CarPosition = { latitude, longitude };
  await user.save();

  res.send({ success: true });
});

module.exports = router;

const SerialPort = require("serialport");

const port = new SerialPort("/dev/ttyUSB0", {
  baudRate: 9600,
});

port.on("open", () => {
  console.log("Port série ouvert");
});

port.on("data", (data) => {
  const positionData = JSON.parse(data.toString());
  // Envoyer les données de position au serveur
  axios.post("/api/position", positionData);
});

router.get("/position", async (req, res) => {
  const user = await User.findById(req.userId);

  res.send({ position: user.CarPosition });
});
