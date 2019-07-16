const express = require('express');
const app = express();
const morgan = require('morgan');
const playstore = require('./playstore.js');

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const sort = req.query.sort;
  const genres = req.query.genres;

  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res.status(400).send('Sort must be of rating or app');
    }
  }

  let results=playstore.filter(game=>game.App.toLowerCase());
  

  if(sort){
    results.sort((a,b)=>{
      return a[sort]>b[sort]?1:a[sort]<b[sort]?-1:0;
    });
  }

  

  res.json(results);

});





app.listen(8000, () => {
  console.log('Server is listening at port 8000');
});
