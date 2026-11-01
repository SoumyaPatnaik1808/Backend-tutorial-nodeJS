const express = require('express'); 
const {ShortenURL, RedirectURL} = require('../Controllers/url')
const router = express.Router(); 
 

router.post('/' , ShortenURL);
router.get('/:shortId', RedirectURL);
    
module.exports = router;