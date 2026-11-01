const shortid = require('shortid')
const Url = require('../Models/url.js') ;

async function ShortenURL(req,res){
    //we will be using shortid package to generate short URL 
    const body = req.body; 
    if(!body.url){
       return res.status(400).json({error: "URL is required"});
    }
    const shortID = shortid.generate(); 
    await Url.create({shortID:shortID , 
        redirectURL : body.url,
        visitHistory : []
      
    
    })

    return res.json({id:shortID})
}

async function RedirectURL(req, res) {
    const shortID = req.params.shortId;
    const entry = await Url.findOneAndUpdate(
        { shortID },
        { $push: { visitHistory: { timestamp: new Date() } } }
    );

    if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(entry.redirectURL);
}

module.exports = { ShortenURL, RedirectURL };
