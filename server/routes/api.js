var express = require('express');
var router = express.Router();
var db = require('../db');
var openai = require('../openai');

// ---------------
// Database routes
// ---------------

// --- CREATE ----

// Create and persist user with unique user_id
router.post('/user', async function (req, res, next) { 
  const user_id = '12345'; //req.body.user_id;
  const username = 'test_user'; //req.body.user_id;
  const avatar = 'me.png'; //req.body.user_id;

  try {
    await db.createUser(user_id, username, avatar);
    res.status(200).send('200 | User created.');
  } catch (err) {
    res.status(500).send('500 | ' + err);
  }
});


// --- READ ---

// Get general user information (name, avatar, previous themes)
router.get('/user/:user_id', async function (req, res, next) {
  const {user_id} = req.params; 
  
  try {
    var response = await db.getUser(user_id);
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
router.get('/user/:user_id/user_stats', async function (req, res, next) {
  const {user_id} = req.params; 

  try {
    var response = await db.getUserStats(user_id);
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
router.put('/user/:user_id/username', async function (req, res, next) {
  const {user_id} = req.params; 
  const username = 'placeholder_new_name'; //req.body.user_id;

  try {
    var response = await db.updateUsername(user_id, username);
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
router.put('/user/:user_id/avatar', async function (req, res, next) {
  const {user_id} = req.params; 
  const avatar = 'placeholder_new_avatar.png'; //req.body.avatar;

  try {
    var response = await db.updateAvatar(user_id, avatar);
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
router.put('/user/:user_id/previous_theme', async function (req, res, next) {
  const {user_id} = req.params; 
  const current_theme = 'space'; //req.body.current_theme;

  try {
    var response = await db.addPreviousTheme(user_id, current_theme);
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
router.put('/user/:user_id/session_results', async function (req, res, next) {
  const {user_id} = req.params; 
  const scores = {innocent: {wins: 4, losses:0}, inkposter: {wins: 4, losses: 7}}; //req.body.scores;
  const drawing = 'placeholder_drawing.png' //req.body.drawing;

  try {
    var response = await db.addSessionResults(user_id, scores, drawing);
    if (response != null) {
        if (response.acknowledged) {
          res.status(200).send(response); //'200 | Sessions results added to profile.' 
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
router.delete('/user/:user_id/delete', async function (req, res, next) { //delete('/user/:user_id', async function (req, res, next) {
  const {user_id} = req.params; 

  try {
    var deleted = await db.deleteUserProfile(user_id);
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
router.get('openai/username/', async function (req, res, next) {
  try {
    var generated_username = await openai.generateUsername();
    if (generated_username != null) {
        res.status(200).send(generated_username);
    } else {
      res.status(500).send('500 | Something went wrong.');
    }
  } catch (err) {
    res.status(502).send('502 | Bad gateway.');
  }
});

// Return json object with theme and prompts for both innocents and inkposter
router.get('openai/session_prompts', async function (req, res, next) {
  try {
    var session_params = await openai.generateSessionParams();
    if (session_params != null) {
        res.status(200).send(session_params);
    } else {
      res.status(500).send('500 | Something went wrong.');
    }
  } catch (err) {
    res.status(502).send('502 | Bad gateway.');
  }
});

module.exports = router;
