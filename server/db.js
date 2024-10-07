// setup connection to mongodb
const { json } = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI

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

async function disconnectFromMongoDB() {
  try {
    await client.close();
    console.log("Successfully disconnected from MongoDB!");
  } catch (err) {
    console.error("MongoDB disconnection error:", err);
  }
}

// --- CREATE ---

async function createUser(userID, username, avatar) {
  try {
    await client.db("dh2643_inkposter").collection('users').insertOne({_id : userID, username, avatar});
    await client.db("dh2643_inkposter").collection('user_stats').insertOne({ _id: userID, innocent: {wins : 0, losses: 0}, inkposter: {wins : 0, losses: 0}, gallery: []});
  
  } catch (err) {
    throw new Error(err);
  }

    
  }

// --- READ ---

async function getUser(userID) {
  return await client.db("dh2643_inkposter").collection('users').findOne({ _id: userID });
}

async function getUserStats(userID) {
  return await client.db("dh2643_inkposter").collection('user_stats').findOne({ _id: userID });
}


// --- UPDATE ---

async function updateUsername(userID, username) {
  return await client.db("dh2643_inkposter").collection('users').updateOne({ _id: userID }, {$set: {username: username}});
}

async function updateAvatar(userID, avatar) {
  return await client.db("dh2643_inkposter").collection('users').updateOne({_id: userID }, {$set: {avatar: avatar}});
}

async function addSessionResults(userID, scores, drawing) {
  return await client.db("dh2643_inkposter").collection('user_stats').updateOne({ _id: userID }, {$set: scores, $push: {gallery: drawing}});
}


// --- DELETE ---

// Delete user
async function deleteUserProfile(userID) {
  const response_user = await client.db("dh2643_inkposter").collection('users').deleteOne({ _id: userID });
  const response_stats = await client.db("dh2643_inkposter").collection('user_stats').deleteOne({ _id: userID });
  
  return (response_user.deletedCount == 1 && response_stats.deletedCount == 1);
}

exports.connectToMongoDB = connectToMongoDB;
exports.disconnectFromMongoDB = disconnectFromMongoDB;
exports.createUser = createUser;
exports.getUser = getUser;
exports.getUserStats = getUserStats;
exports.updateUsername = updateUsername;
exports.updateAvatar = updateAvatar;
exports.addSessionResults = addSessionResults;
exports.deleteUserProfile = deleteUserProfile;