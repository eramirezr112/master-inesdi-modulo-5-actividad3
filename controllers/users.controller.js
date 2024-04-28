const User = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");
const { sessions } = require("../middlewares/auth.middleware");

const login = (req, res) => {
  User.findOne({ email: req.body.email, password: req.body.password })
    .then((user) => {
      if (user) {
        const token = uuidv4();
        sessions.push({ userId: user.id, token });
        res.json({ token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(console.error);
};

function listUsers(req, res) {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
    });
}

function detailUser(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function createUser(req, res) {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
}

module.exports = {
  login,
  listUsers,
  detailUser,
  createUser,
};
