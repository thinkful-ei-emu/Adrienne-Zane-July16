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

  if (genres) {
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
      return res.status(400).send('Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card');
    }
  }

  let queryResults = [];

  let results=playstore
    .filter(game=>
      game
        .App
        .toLowerCase()
    );

  let genreResults = playstore.filter(type => type.Genres === genres);
  // console.log(genreResults);
  

  if(sort){
    results.sort((a,b)=>{
      return a[sort]>b[sort]?1:a[sort]<b[sort]?-1:0;
    });
    return res.json(results);
  }
  
  if(genres){
    return res.json(genreResults);
  }

});


app.listen(8000, () => {
  console.log('Server is listening at port 8000');
});
