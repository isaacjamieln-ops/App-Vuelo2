const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  img: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Crear el modelo
const City = mongoose.model('City', citySchema);

// Exportar el modelo directamente
module.exports = City;