const express = require('express');

const router = express.Router();

// Sample route
router.get('/users', (req, res) => {
  res.send('Hello World! api');
});

router.get('/:url', (req,res)=>{
   if(!req.params.url){
    return res.end('url not found')
   }
   res.redirect('https://www.youtube.com/')
})
module.exports = router;
  