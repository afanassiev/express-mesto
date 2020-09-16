const usersRouter = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

const usersList = (req, res) => {
  fsPromises.readFile(
    (path.join(__dirname, '..', 'data', 'users.json')),
    'utf-8'
  )
    .then((data) => {
      res.send(JSON.parse(data));
    })
    .catch(err => {
      res.status(500).send(`Ошибка чтения файла`);
    })
}

const sendUser = (req, res) => {
  fsPromises.readFile(
    (path.join(__dirname, '..', 'data', 'users.json')),
    'utf-8'
  )
    .then((data) => {
      const doesUserExist = JSON.parse(data).find((user) => user._id === req.params.id)
      doesUserExist ? res.send(doesUserExist) : res.status(404).send(`Нет пользователя с таким id`);
    })
    .catch(err => {
      res.status(500).send(`Ошибка чтения файла`);
    })
}

usersRouter.get('/users', usersList);
usersRouter.get('/users/:id', sendUser);


module.exports = usersRouter;