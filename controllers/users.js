const User = require('../models/user');

module.exports.usersList = (req, res) => {
  User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send('Ошибка чтения файла');
    });
}

module.exports.sendUser = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (user._id !== req.params.id) {
        return res.status(404).send('Нет пользователя с таким id');
      }
      return res.send({data: user});
    })
        .catch(() => {
          res.status(500).send('Ошибка чтения файла');
    });
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body
  User.create({name, about, avatar})
    .then(user => res.status(200).send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({message: 'Ошибка: переданы некорректные данные!'})
      }
        res.status(500).send({message: 'Ошибка!'})
    }
    )
}