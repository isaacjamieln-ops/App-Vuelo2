const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Importar rutas
const ciudadesRoutes = require("./routes/ciudades");
const itinerariesRoutes = require("./routes/itineraries");
const weatherRoutes = require("./routes/weather"); // ✅ Movido aquí arriba

const app = express();
const port = process.env.PORT || 5000;

// 🔥 MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 🔐 CONEXIÓN A MONGO (con variable de entorno para producción)
const uri = process.env.MONGODB_URI || "mongodb://rootviajeseguro:Kurumi@ac-frecrb4-shard-00-00.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-01.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-02.29flmed.mongodb.net:27017/?ssl=true&replicaSet=atlas-7i2p1a-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ViajeSeguro";

const client = new MongoClient(uri);
let db;

// ✅ CONEXIÓN DE MONGOOSE (para itinerarios)
mongoose.connect(uri)
  .then(() => console.log("✅ Mongoose conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error conectando Mongoose:", err));

async function connectDB() {
  try {
    await client.connect();
    db = client.db("appVueloDB");
    
    // 🔥 Pasar la conexión a las rutas de ciudades
    if (ciudadesRoutes.setDB) {
      ciudadesRoutes.setDB(db);
    }
    
    // 🔥 Pasar la conexión a las rutas de itinerarios
    if (itinerariesRoutes.setDB) {
      itinerariesRoutes.setDB(db);
    }
    
    console.log("✅ Conectado a MongoDB Atlas (MongoClient)");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
  }
}

connectDB();

// 🟢 RUTA BASE
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// 📥 INSERTAR DATOS (SEED)
app.get("/seed", async (req, res) => {
  try {
    if (!db) {
      return res.status(500).send("❌ Base de datos no conectada");
    }
    
    await db.collection("cities").deleteMany({});

    const cities = [
      { name: "Tokyo", country: "Japan" },
      { name: "Paris", country: "France" },
      { name: "New York", country: "USA" },
      { name: "Berlin", country: "Germany" },
      { name: "Madrid", country: "Spain" },
      { name: "Rome", country: "Italy" },
      { name: "London", country: "UK" },
      { name: "Seoul", country: "South Korea" },
      { name: "Toronto", country: "Canada" },
      { name: "Mexico City", country: "Mexico" }
    ];

    await db.collection("cities").insertMany(cities);
    res.send("✅ Datos insertados correctamente");
  } catch (error) {
    res.status(500).send("❌ Error al insertar datos: " + error.message);
  }
});

// ✅ INTEGRACIÓN DE RUTAS DE CIUDADES (RESTful)
app.use("/api/cities", ciudadesRoutes.router);

// ✅ INTEGRACIÓN DE RUTAS DE ITINERARIOS (RESTful)
app.use("/api/itineraries", itinerariesRoutes.router);

// ✅ INTEGRACIÓN DE RUTAS DE CLIMA (RESTful)
app.use("/api/weather", weatherRoutes);

// 📊 MANTENEMOS LA RUTA ORIGINAL /cities (por compatibilidad)
app.get("/cities", async (req, res) => {
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

// ➕ MANTENEMOS LA RUTA ORIGINAL POST /cities (por compatibilidad)
app.post("/cities", async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: "Base de datos no conectada" });
    }
    
    const { name, country } = req.body;

    if (!name || !country) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const result = await db.collection("cities").insertOne({ name, country });

    res.json({
      message: "Ciudad creada",
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🎯 RUTA ESPECÍFICA PARA EL TUTORIAL (localhost:5000/cities/test)
app.get("/cities/test", (req, res) => {
  res.json({ message: "Ruta de prueba de ciudades." });
});

// 🚀 SERVIDOR (SIEMPRE AL FINAL)
app.listen(port, () => {
  console.log(`🔥 Server corriendo en puerto ${port}`);
});