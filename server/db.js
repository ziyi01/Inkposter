// setup connection to mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jessicagorwat:adviprog24@cluster0.mf3im.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    return client.db();
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

async function create() {
    await client.db("sample_dh2643").collection('users').insertOne({ name: "Göran" });
    console.log("\nInserted new document in collection")
}

exports.connectToMongoDB = connectToMongoDB;
exports.create = create;