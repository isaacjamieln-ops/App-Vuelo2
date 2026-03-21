const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("../routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/appviaje")
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API MERN funcionando");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});