const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schéma pour les utilisateurs
const userSchema = new Schema({
    FirstName:{ type: String, required: true ,minlength: 3}, 
    LastName:{ type: String, required: true,minlength: 3},
    CarType:{ type: String},
    CarId:{ type: String},
    PhoneNumber:{ type: String, rconst mongoose = require("mongoose");
    const Schema = mongoose.Schema;
    
    // Schéma pour les utilisateurs
    const userSchema = new Schema({
        FullName:{ type: String, required: true ,minlength: 3}, 
        email:{ type: String, required: true, unique: true},
        password:{ type: String, required: true ,minlength: 8}, 
        CarId:{ type: String,required: true}
    })
    
    // Modèle pour les utilisateurs
    const user = mongoose.model("user", userSchema);
    
    module.exports = user ;
    equired: true},
    email:{ type: String, required: true, unique: true},
    password:{ type: String, required: true ,minlength: 8}, 
    cars: [{latitude: {type: Number,required: true },
      longitude: {type: Number,required: true},
      timestamp: {type: Date,default: Date.now}
      }]
})

// Modèle pour les utilisateurs
const user = mongoose.model("user", userSchema);

module.exports = user ;
