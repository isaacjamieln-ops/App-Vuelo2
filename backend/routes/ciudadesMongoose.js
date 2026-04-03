const express = require("express");
const CityModel = require("../model/cityModel"); // Importar el modelo
const router = express.Router();

// 🧪 RUTA DE PRUEBA
router.get("/test", (req, res) => {
  res.json({ message: "✅ Ruta de ciudades con Mongoose funcionando" });
});

// 📊 OBTENER TODAS LAS CIUDADES (ruta /all)
router.get('/all', (req, res) => {
  CityModel.find()
    .then(cities => {
      res.json(cities);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Error del servidor" });
    });
});

// 📊 OBTENER TODAS LAS CIUDADES (ruta principal /)
router.get("/", async (req, res) => {
  try {
    const cities = await CityModel.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔍 OBTENER CIUDAD POR ID
router.get("/:id", async (req, res) => {
  try {
    const city = await CityModel.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ error: "Ciudad no encontrada" });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➕ CREAR NUEVA CIUDAD (POST)
router.post('/', (req, res) => {
  const newCity = new CityModel({
    name: req.body.name,
    country: req.body.country,
    img: req.body.img || ''
  });

  newCity.save()
    .then(city => {
      res.json(city);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Error del servidor" });
    });
});

// ✏️ ACTUALIZAR CIUDAD
router.put("/:id", async (req, res) => {
  try {
    const { name, country, img } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (country) updateData.country = country;
    if (img) updateData.img = img;
    
    const city = await CityModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!city) {
      return res.status(404).json({ error: "Ciudad no encontrada" });
    }
    
    res.json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🗑️ ELIMINAR CIUDAD
router.delete("/:id", async (req, res) => {
  try {
    const city = await CityModel.findByIdAndDelete(req.params.id);
    
    if (!city) {
      return res.status(404).json({ error: "Ciudad no encontrada" });
    }
    
    res.json({ message: "✅ Ciudad eliminada exitosamente", deletedCity: city });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;