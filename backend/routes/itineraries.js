const express = require("express");
const Itinerary = require("../model/Itinerary");
const router = express.Router();

// Variable para la base de datos
let db;

const setDB = (database) => {
  db = database;
};

// 🧪 RUTA DE PRUEBA
router.get("/test", (req, res) => {
  res.json({ message: "✅ Ruta de itinerarios funcionando correctamente" });
});

// 📊 OBTENER TODOS LOS ITINERARIOS
router.get("/", async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📊 OBTENER ITINERARIOS POR ID DE CIUDAD
router.get("/city/:cityId", async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ cityId: req.params.cityId });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📊 OBTENER ITINERARIOS POR NOMBRE DE CIUDAD (LO agregue para seguir ele tutorial, originalmente lo hice con ID)
router.get("/cityname/:cityName", async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ 
      cityName: { $regex: new RegExp(`^${req.params.cityName}$`, 'i') } 
    });
    
    if (itineraries.length === 0) {
      return res.status(404).json({ 
        message: `No se encontraron itinerarios para: ${req.params.cityName}`,
        itineraries: []
      });
    }
    
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➕ CREAR NUEVO ITINERARIO
router.post("/", async (req, res) => {
  try {
    console.log("📥 Body recibido:", req.body);
    
    const itinerary = new Itinerary({
      title: req.body.title,
      profilePhoto: req.body.profilePhoto || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      rating: req.body.rating || 0,
      duration: req.body.duration,
      price: req.body.price,
      hashtags: req.body.hashtags || [],
      cityId: req.body.cityId,
      cityName: req.body.cityName,
      description: req.body.description
    });
    
    const savedItinerary = await itinerary.save();
    console.log("✅ Guardado:", savedItinerary._id);
    res.status(201).json(savedItinerary);
  } catch (error) {
    console.error("❌ Error detallado:", error);
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
});

// ✏️ ACTUALIZAR ITINERARIO
router.put("/:id", async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!itinerary) {
      return res.status(404).json({ error: "Itinerario no encontrado" });
    }
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🗑️ ELIMINAR ITINERARIO
router.delete("/:id", async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ error: "Itinerario no encontrado" });
    }
    res.json({ message: "✅ Itinerario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { router, setDB };