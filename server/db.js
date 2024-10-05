// setup connection to mongodb
const { json } = require('express');
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

// --- CREATE ---

async function createUser(userID, username, avatar) {
    await client.db("dh2643_inkposter").collection('users').insertOne({_id : userID, username, avatar});
    await client.db("dh2643_inkposter").collection('user_stats').insertOne({ _id: userID, innocent: {wins : 0, losses: 0}, inkposter: {wins : 0, losses: 0}});
}

// --- READ ---

async function getUser(userID) {
  return await client.db("dh2643_inkposter").collection('users').findOne({ _id: userID });
}

async function getUserStats(userID) {
  return await client.db("dh2643_inkposter").collection('user_stats').findOne({ _id: userID });
}


// --- UPDATE ---

async function udpateUsername(userID, username) {
  await client.db("dh2643_inkposter").collection('users').updateOne({ userID: userID }, {$set: {username: username}});
  return {};
}

async function udpateAvatar(userID, avatar) {
  await client.db("dh2643_inkposter").collection('users').updateOne({ userID: userID }, {$set: {avatar: avatar}});
  return {};
}

async function addSessionResults(userID, avatar) {
  //await client.db("dh2643_inkposter").collection('user_stats').updateOne({ userID: userID }, {$set: {avatar: avatar}});
  return {};
}

// --- DELETE ---

// Delete user
async function getUserProfile(userID) {
  await client.db("dh2643_inkposter").collection('users').deleteOne({ userID: username });
  await client.db("dh2643_inkposter").collection('user_stats').insertOne({ userID: username });
}

exports.connectToMongoDB = connectToMongoDB;
exports.createUser = createUser;
exports.getUser = getUser;
exports.getUserStats = getUserStats;