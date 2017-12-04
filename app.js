const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('combined'));
app.use('/', routes);

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'));
