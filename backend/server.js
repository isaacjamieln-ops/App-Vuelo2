const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// 🔥 MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 🔐 CONEXIÓN A MONGO
const uri = "mongodb://rootviajeseguro:Kurumi@ac-frecrb4-shard-00-00.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-01.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-02.29flmed.mongodb.net:27017/?ssl=true&replicaSet=atlas-7i2p1a-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ViajeSeguro";

const client = new MongoClient(uri);
let db;

async function connectDB() {
  await client.connect();
  db = client.db("appVueloDB");
  console.log("✅ Conectado a MongoDB Atlas");
}

connectDB();


// 🟢 RUTA BASE
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});


// 📥 INSERTAR DATOS (SEED)
app.get("/seed", async (req, res) => {
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

  res.send("✅ Datos insertados");
});


// 📊 OBTENER CIUDADES
app.get("/cities", async (req, res) => {
  const cities = await db.collection("cities").find().toArray();
  res.json(cities);
});


// ➕ CREAR CIUDAD (USA BODY PARSER)
app.post("/cities", async (req, res) => {
  const { name, country } = req.body;

  if (!name || !country) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const result = await db.collection("cities").insertOne({ name, country });

  res.json({
    message: "Ciudad creada",
    id: result.insertedId
  });
});


// 🚀 SERVIDOR
app.listen(port, () => {
  console.log("🔥 Server corriendo en puerto " + port);
});