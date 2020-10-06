const Card = require('../models/card');

module.exports.cardsList = (req, res) => {
  Card.find({})
    .then(cards => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send('Ошибка чтения файла');
    });
}

module.exports.createCard = (req, res) => {
  const {name, link} = req.body
  Card.create({name, link, owner: req.user._id})
    .then(card => res.send(card))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Ошибка: переданы некорректные данные!'})
      }
        res.status(500).send({message: 'Ошибка!'})
    }
    )
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Ошибка!' }))
}