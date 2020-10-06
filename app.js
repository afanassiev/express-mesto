const express = require('express');
const mongoose = require('mongoose');
const cards = require('./routes/cards');
const users = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.use(express.static('public'));

app.use('/', cards);
app.use('/', users);

app.all('*', (req, res) => {
  res.status(404).send('Запрашиваемый ресурс не найден');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
