const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schéma pour les utilisateurs
const userSchema = new Schema({
    FirstName:{ type: String, required: true ,minlength: 3}, 
    LastName:{ type: String, required: true,minlength: 3},
    CarType:{ type: String},
    CarId:{ type: String},
    PhoneNumber:{ type: String, required: true},
    email:{ type: String, required: true, unique: true},
    password:{ type: String, required: true ,minlength: 8}, 
    CarPosition: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
})

// Modèle pour les utilisateurs
const user = mongoose.model("user", userSchema);

module.exports = user ;
