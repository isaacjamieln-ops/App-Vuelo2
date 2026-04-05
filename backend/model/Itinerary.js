const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  profilePhoto: {
    type: String,
    required: true,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 0
  },
  duration: {
    type: String,
    required: true,
    enum: ['1 día', '2-3 días', '4-7 días', '1-2 semanas', '+2 semanas']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  hashtags: [{
    type: String,
    trim: true
  }],
  cityId: {
    type: String,  // ✅ Cambiado a String para evitar problemas con ObjectId
    required: true
  },
  cityName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  activities: [{
    day: Number,
    title: String,
    description: String,
    image: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Itinerary', itinerarySchema);