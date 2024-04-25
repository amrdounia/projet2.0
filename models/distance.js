const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    vehicleId: {
      type: String,
      required: true,
      unique: true
    },
    startLocation: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        required: true,
        index: '2dsphere'
      }
    },
    endLocation: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        required: true,
        index: '2dsphere'
      }
    },
    distanceTraveled: {
      type: Number,
      default: 0
    }
  });
  
  const Vehicle = mongoose.model('Vehicle', vehicleSchema);
  
  module.exports = Vehicle ;