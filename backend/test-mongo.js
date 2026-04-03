const { MongoClient } = require('mongodb');

const uri = "mongodb://rootviajeseguro:Kurumi@ac-frecrb4-shard-00-00.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-01.29flmed.mongodb.net:27017,ac-frecrb4-shard-00-02.29flmed.mongodb.net:27017/?ssl=true&replicaSet=atlas-7i2p1a-shard-0&authSource=admin&retryWrites=true&w=majority&appName=ViajeSeguro";

async function testConnection() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ ¡Conexión exitosa a MongoDB Atlas!");
    const db = client.db("appVueloDB");
    const collections = await db.listCollections().toArray();
    console.log("Colecciones:", collections.map(c => c.name));
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
  } finally {
    await client.close();
  }
}

testConnection();