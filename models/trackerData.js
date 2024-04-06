const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackerDataSchema = new Schema({
    vehicleId: String,
    timestamp: Date,
    latitude: Number,
    longitude: Number,
    
});

const TrackerData = mongoose.model('TrackerData', trackerDataSchema);

module.exports = TrackerData;
