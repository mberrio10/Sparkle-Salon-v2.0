const express = require('express');
const bodyParser = require('body-parser');

const index = express();

index.set('view engine', 'ejs');

index.use(express.static('public'));

index.get('/', (req, res) => {
  res.render('index');
});

index.get('/hair', (req, res) => {
  res.render('hair');
});

index.get('/nails', (req, res) => {
  res.render('nails');
});

index.get('/about', (req, res) => {
  res.render('about');
});


index.listen(3000, () => {
  console.log('Sever started on port 3000');
});
