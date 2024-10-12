var express = require('express');
var router = express.Router();
var db = require('../db');
var openai = require('../openai');
var debug = require('debug')('server:api');

// ---------------
// Database routes
// ---------------

// --- CREATE ----

// Create and persist user with unique userID. If user exists, simply return a confirmation.
router.post('/user', async function (req, res, next) { 
  var userID = req.body.userID; 
  const username = req.body.username;
  const avatar = req.body.avatar;

  if (typeof (userID) !== 'string') {
    userID = userID.toString();
  }

  try {
    if (await db.getUser(userID)) {
      res.status(200).send('200 | User exists in database.');
    } else {
      await db.createUser(userID, username, avatar);
      res.status(200).send('200 | User created.');
    }
  } catch (err) {
    res.status(500).send('500 | ' + err);
  }
});


// --- READ ---

// Get general user information (name, avatar, previous themes)
router.get('/user/:userID', async function (req, res, next) {
  const { userID } = req.params;
  
  try {
    var response = await db.getUser(userID);
    if (response != null) {
      res.send(response);
    } else {
      res.status(404).send('404 | User not found.');
    }
  } catch (err) {
    res.status(500).send('500 | Something went wrong.');
  }
});

// Get stats from user's previous games
router.get('/user/:userID/userStats', async function (req, res, next) {
  const {userID} = req.params; 

  try {
    var response = await db.getUserStats(userID);
    if (response != null) {
      res.send(response);
    } else {
      res.status(404).send('404 | User not found.');
    }
  } catch (err) {
    res.status(500).send('500 | Something went wrong.');
  }

});


// --- UPDATE ---

// Update username
// TODO (potentially): make sure users can't choose an existing username
router.patch('/user/:userID/username', async function (req, res, next) {
  const {userID} = req.params; 
  const username = req.body.username;

  try {
    var response = await db.updateUsername(userID, username);
    if (response != null) {
        if (response.acknowledged) {
          res.status(200).send('200 | Username updated.');
        } else {
          res.status(500).send('500 | Could not update username.');
        }
    } else {
      res.status(500).send('500 | Something went wrong :(');
    }
  } catch (err) {
    res.status(500).send('500 | Something went wrong.');
  }
});

// Update avatar
router.patch('/user/:userID/avatar', async function (req, res, next) {
  const {userID} = req.params; 
  const avatar = req.body.avatar;

  try {
    var response = await db.updateAvatar(userID, avatar);
    if (response != null) {
        if (response.acknowledged) {
          res.status(200).send('200 | Avatar updated.');
        } else {
          res.status(500).send('500 | Could not update avatar.');
        }
    } else {
      res.status(500).send('500 | Something went wrong :(');
    }
  } catch (err) {
    res.status(500).send('500 | Something went wrong.');
  }
});

// Add current theme to users previous themes
router.patch('/user/:userID/previousThemes', async function (req, res, next) {
  const {userID} = req.params; 
  const currentTheme = req.body.currentTheme;

  try {
    var response = await db.updatePreviousThemes(userID, currentTheme);
    if (response != null) {
        if (response.acknowledged) {
          res.status(200).send('200 | Theme added to previous themes.');
        } else {
          res.status(500).send('500 | Could not add theme.');
        }
    } else {
      res.status(500).send('500 | Something went wrong.');
    }
  } catch (err) {
    res.status(500).send('500 | Something went wrong.');
  }
});

// Increment relevant wins/losses and add drawing to user's gallery
router.patch('/user/:userID/sessionResults', async function (req, res, next) {
  const {userID} = req.params; 
  const scores = req.body.scores; // ex. {innocent: {wins: 4, losses:0}, inkposter: {wins: 4, losses: 7}}; 
  const drawing = req.body.drawing; // ex. 'placeholder_drawing.png'

  try {
    var response = await db.addSessionResults(userID, scores, drawing);
    if (response != null) {
        if (response.acknowledged) {
          res.status(200).send('200 | Sessions results added to profile.');  
        } else {
          res.status(500).send('500 | Could not sessions scores.');
        }
    } else {
      res.status(500).send('500 | Something went wrong :(');
    }
  } catch (err) {
    res.status(500).send('500 | Something went wrong.' + err);
  }
});

// --- DELETE ---

// Delete user
router.delete('/user/:userID', async function (req, res, next) { //delete('/user/:userID', async function (req, res, next) {
  const { userID } = req.params;
  
  if (typeof (userID) !== 'string') {
    userID = userID.toString();
  }

  try {
    var deleted = await db.deleteUserProfile(userID);
    if (deleted != null) {
        res.status(200).send('200 | User deleted.');
    } else {
      res.status(500).send('500 | Something went wrong :(');
    }
  } catch (err) {
    res.status(500).send('500 | Something went wrong.');
  }
});


// ---------------
// Open AI routes
// ---------------

// Return a unique username generated by openAI
router.get('/openai/username', async function (req, res, next) {
  try {
    var generatedUsername = await openai.generateUsername();
    if (generatedUsername != null) {
        res.status(200).send(generatedUsername);
    } else {
      res.status(500).send('500 | Something went wrong.');
    }
  } catch (err) {
    res.status(502).send('502 | Bad gateway.');
  }
});

// Return json object with theme and prompts for both innocents and inkposter
router.get('/openai/sessionParams', async function (req, res, next) {
  try {
    var sessionParams = await openai.generateSessionParams();
    if (sessionParams != null) {
        res.status(200).send(sessionParams);
    } else {
      res.status(500).send('500 | Something went wrong.');
    }
  } catch (err) {
    res.status(502).send('502 | Bad gateway.');
  }
});

module.exports = router;
