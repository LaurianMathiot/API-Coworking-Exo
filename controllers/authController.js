const { userModel, roleModel } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../routes/coworkingRoutes");
const SECRET_KEY = "ma_clé_secrète";

const rolesHierarchy = {
  user: "user",
  editor: ["user", "editor"],
  admin: ["user", "editor", "admin"],
};

rolesHierarchy["editor"];

// CREATE USER ------------------------------------------------------------------

exports.signUp = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const newUser = { ...req.body, password: hash };
      return userModel.create(newUser).then((user) => {
        return res.status(201).json({
          message: `L'utilisateur ${newUser.username} a bien été créé.`,
          data: user,
        });
      });
    })
    .catch((error) => {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({
        message: `L'élément n'a pas pu être créé. ${error}`,
      });
    });
};

exports.login = (req, res) => {
  userModel
    .findOne({
      where: { username: req.body.username },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: `L'utilisateur ${req.body.username} n'existe pas`,
        });
      } else {
        bcrypt.compare(req.body.password, user.password).then((isValid) => {
          if (isValid) {
            const token = jwt.sign(
              {
                data: user.username,
              },
              SECRET_KEY,
              { expiresIn: 60 * 60 }
            );
            res.json({ message: "login réussi", data: token });
          } else {
            return res.json({ message: "Le mot de passe est incorrect." });
          }
        });
      }

      console.log(user.password);
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message });
    });
};

exports.protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: `Vous n'êtes pas authentifié` });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.username = decoded.data;
      next();
    } catch (error) {
      res.status(403).json({
        message: `Le jeton n'est pas valide`,
      });
    }
  } else {
    res.json({ message: "Vous n'avez pas l'authorization" });
  }
};

exports.restrictTo = (roleParam) => {
  return (req, res, next) => {
    if (roleParam) {
      console.log(req.username);
      userModel.findOne({ where: { username: req.username } }).then((user) => {
        console.log(user);
        roleModel.findByPk(user.roleId).then((role) => {
          if (rolesHierarchy[role.label].includes(roleParam)) {
            return next();
          } else {
            return res
              .status(403)
              .json({ message: `Vous n'avez pas les droits` });
          }
        });
      });
    }
  };
};
