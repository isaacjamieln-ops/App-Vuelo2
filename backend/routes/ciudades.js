const express = require("express");
const router = express.Router();

// 📌 NOTA: La conexión a la base de datos se pasa desde server.js
// Esta variable se asignará cuando se llame a la función setDB
let db;

// Función para pasar la conexión de la base de datos
const setDB = (database) => {
  db = database;
};

// 🧪 RUTA DE PRUEBA
router.get("/test", (req, res) => {
  res.json({ message: "✅ Ruta de ciudades funcionando correctamente" });
});

// 📊 OBTENER TODAS LAS CIUDADES
router.get("/", async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: "Base de datos no conectada" });
    }
    const cities = await db.collection("cities").find().toArray();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔍 OBTENER CIUDAD POR ID
router.get("/:id", async (req, res) => {
  try {
    const { ObjectId } = require("mongodb");
    const { id } = req.params;
    
    if (!db) {
      return res.status(500).json({ error: "Base de datos no conectada" });
    }
    
    const city = await db.collection("cities").findOne({ _id: new ObjectId(id) });
    
    if (!city) {
      return res.status(404).json({ error: "Ciudad no encontrada" });
    }
    
    res.json(city);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➕ CREAR NUEVA CIUDAD
router.post("/", async (req, res) => {
  try {
    const { name, country } = req.body;
    
    if (!name || !country) {
      return res.status(400).json({ error: "Faltan datos: name y country son requeridos" });
    }
    
    if (!db) {
      return res.status(500).json({ error: "Base de datos no conectada" });
    }
    
    const result = await db.collection("cities").insertOne({ name, country });
    
    res.json({
      message: "✅ Ciudad creada exitosamente",
      id: result.insertedId,
      city: { name, country }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✏️ ACTUALIZAR CIUDAD
router.put("/:id", async (req, res) => {
  try {
    const { ObjectId } = require("mongodb");
    const { id } = req.params;
    const { name, country } = req.body;
    
    if (!db) {
      return res.status(500).json({ error: "Base de datos no conectada" });
    }
    
    const updateData = {};
    if (name) updateData.name = name;
    if (country) updateData.country = country;
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No hay datos para actualizar" });
    }
    
    const result = await db.collection("cities").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Ciudad no encontrada" });
    }
    
    res.json({
      message: "✅ Ciudad actualizada exitosamente",
      updated: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🗑️ ELIMINAR CIUDAD
router.delete("/:id", async (req, res) => {
  try {
    const { ObjectId } = require("mongodb");
    const { id } = req.params;
    
    if (!db) {
      return res.status(500).json({ error: "Base de datos no conectada" });
    }
    
    const result = await db.collection("cities").deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Ciudad no encontrada" });
    }
    
    res.json({
      message: "✅ Ciudad eliminada exitosamente",
      deleted: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exportar router y la función setDB
module.exports = { router, setDB };