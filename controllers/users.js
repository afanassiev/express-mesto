const User = require('../models/user');
const fsPromises = require('fs').promises;
const path = require('path');

module.exports.usersList = (req, res) => {
  fsPromises.readFile(
    (path.join(__dirname, '..', 'data', 'users.json')),
    'utf-8',
  )
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(() => {
      res.status(500).send('Ошибка чтения файла');
    });
};

module.exports.sendUser = (req, res) => {
  fsPromises.readFile(
    (path.join(__dirname, '..', 'data', 'users.json')),
    'utf-8',
  )
    .then((data) => {
      const doesUserExist = JSON.parse(data).find((user) => user._id === req.params.id);
      if (!doesUserExist) {
        res.status(404).send('Нет пользователя с таким id');
      }
      res.send(doesUserExist);
    })
    .catch(() => {
      res.status(500).send('Ошибка чтения файла');
    });
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body
  User.create({name, about, avatar})
    .then(user => res.send({data: user}))
    .catch(err => res.status(500).send({message: 'Ошибка!'}))
}