const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const ciudadesRoutes = require("./routes/ciudadesMongoose");

const app = express();
const port = 5000; // Puerto diferente para no conflictuar con el server original (5000)

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 🔐 CONEXIÓN A MONGODB CON MONGOOSE
const uri = "mongodb://rootviajeseguro:Kurumi@ac-frecrb4-shard-00-00.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-01.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-02.29flmed.mongodb.net:27017/?ssl=true&replicaSet=atlas-7i2p1a-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ViajeSeguro";

mongoose.connect(uri)
  .then(() => console.log("✅ Conectado a MongoDB Atlas con Mongoose"))
  .catch(err => console.error("❌ Error conectando a MongoDB:", err));

// 🟢 RUTAS
app.use("/api/cities", ciudadesRoutes);

// 🟢 RUTA BASE
app.get("/", (req, res) => {
  res.send("Servidor Mongoose funcionando 🚀");
});

// 🚀 SERVIDOR
app.listen(port, () => {
  console.log(`🔥 Server Mongoose corriendo en puerto ${port}`);
});