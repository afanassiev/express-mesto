const fsPromises = require('fs').promises;
const path = require('path');
const cardsRouter = require('express').Router();

const cardsList = (req, res) => {
  fsPromises.readFile(
    path.join(__dirname, '..', 'data', 'cards.json'),
    'utf8'
  )
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(err => {
      console.log(err)
    })
}

cardsRouter.get('/cards', cardsList);

module.exports = cardsRouter;