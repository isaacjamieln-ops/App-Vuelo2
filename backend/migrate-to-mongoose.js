const { mongoose, City } = require("./model/cityModel");
const { MongoClient } = require("mongodb");

const uri = "mongodb://rootviajeseguro:Kurumi@ac-frecrb4-shard-00-00.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-01.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-02.29flmed.mongodb.net:27017/?ssl=true&replicaSet=atlas-7i2p1a-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ViajeSeguro";

async function migrate() {
  const mongoClient = new MongoClient(uri);
  
  try {
    // Conectar MongoDB nativo
    await mongoClient.connect();
    const db = mongoClient.db("appVueloDB");
    const oldCities = await db.collection("cities").find().toArray();
    
    console.log(`📥 Encontradas ${oldCities.length} ciudades para migrar`);
    
    // Conectar Mongoose
    await mongoose.connect(uri);
    console.log("✅ Conectado a MongoDB con Mongoose");
    
    // Limpiar colección de Mongoose
    await City.deleteMany({});
    console.log("🧹 Colección limpia");
    
    // Migrar datos
    for (const city of oldCities) {
      const newCity = new City({
        name: city.name,
        country: city.country,
        img: city.img || ''
      });
      await newCity.save();
    }
    
    console.log(`✅ Migradas ${oldCities.length} ciudades correctamente`);
    
  } catch (error) {
    console.error("❌ Error en migración:", error);
  } finally {
    await mongoClient.close();
    await mongoose.disconnect();
  }
}

migrate();