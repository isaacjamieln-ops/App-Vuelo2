// Importamos MongoDB
const { MongoClient, ObjectId } = require('mongodb');

// 🔐 Conexión SIN SRV (funciona con VPN)
const uri = "mongodb://rootviajeseguro:Kurumi@ac-frecrb4-shard-00-00.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-01.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-02.29flmed.mongodb.net:27017/?ssl=true&replicaSet=atlas-7i2p1a-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ViajeSeguro";

// Crear cliente
const client = new MongoClient(uri);

async function run() {
  try {
    console.log("🔌 Conectando a MongoDB Atlas...");
    await client.connect();
    console.log("✅ CONECTADO A ATLAS");

    // Seleccionar DB y colección
    const db = client.db("appVueloDB");
    const collection = db.collection("cities");

    // Limpiar colección (opcional para evitar duplicados)
    console.log("🧹 Limpiando colección...");
    await collection.deleteMany({});

    // 📦 Datos MANUALES (solo name + country)
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

    // Insertar datos
    console.log("📥 Insertando ciudades...");
    const result = await collection.insertMany(cities);
    console.log(`✅ Insertados: ${result.insertedCount}`);

    // Consultar todas las ciudades
    console.log("📊 Consultando todas las ciudades...");
    const allCities = await collection.find().toArray();
    console.log("🟢 Ciudades:");
    console.log(allCities);

    // Buscar una ciudad por ID (ejemplo)
    console.log("🔎 Buscando una ciudad por ID...");
    const oneId = allCities[0]._id;
    const oneCity = await collection.findOne({ _id: new ObjectId(oneId) });

    console.log("🟢 Ciudad encontrada:");
    console.log(oneCity);

  } catch (error) {
    console.log("❌ ERROR:", error);
  } finally {
    await client.close();
    console.log("🔌 Conexión cerrada");
  }
}

// Ejecutar
run();