const express = require('express');
const router = express.Router();
const axios = require('axios');
const Cookies = require('cookies');

router.post('/github/login', async (req, res) => {
  const { code } = req.body;

  // Exchange the code for an access token
  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, 
    
    {
      headers: {
        accept: 'application/json',
      },
    });
    {console.log(code);}
    const { access_token } = response.data;
    const userId = userResponse.data.id; // Or any other unique identifier

    // Set user ID in cookies
    const uniqueId = await loginUserDB(code);
    
    const cookies = new Cookies(req, res);
    cookies.set('userId', uniqueId);
    cookies.set('isAuthenticated', 'true')

    // Optionally fetch user information with the access token
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    

    res.status(200).json({ userId });

  } 
  
  catch (error) {
    console.error('Error during GitHub login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
