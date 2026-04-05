const express = require("express");
const router = express.Router();

// 📊 OBTENER CLIMA POR CIUDAD (DATOS SIMULADOS)
router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;
    
    // Datos de clima simulados por ciudad
    const weatherData = {
      "tokyo": { temp: 18, description: "Parcialmente nublado" },
      "paris": { temp: 15, description: "Lluvia ligera" },
      "london": { temp: 12, description: "Nublado" },
      "new york": { temp: 20, description: "Soleado" },
      "madrid": { temp: 25, description: "Soleado" },
      "rome": { temp: 22, description: "Despejado" },
      "berlin": { temp: 14, description: "Nublado" },
      "seoul": { temp: 16, description: "Parcialmente nublado" },
      "toronto": { temp: 10, description: "Nublado" },
      "mexico city": { temp: 22, description: "Soleado" }
    };
    
    const cityKey = city.toLowerCase();
    const weather = weatherData[cityKey] || { temp: 22, description: "Clima agradable" };
    
    res.json({
      main: { temp: weather.temp },
      weather: [{ description: weather.description }],
      name: city
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;