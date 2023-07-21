const { userModel } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const bcrypt = require("bcrypt");

// FIND ALL ------------------------------------------------------------------

exports.findAllUsers = (req, res) => {
  userModel
    .findAll()
    .then((result) => {
      return res.json({
        message: `La liste des utilisateurs a bien été récupérée.`,
        data: result,
      });
    })
    .catch((error) => {
      return res.json({
        message: error,
      });
    });
};

// CREATE USER ------------------------------------------------------------------

exports.createUsers = (req, res) => {
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

// DELETE COWORKING ------------------------------------------------------------------

exports.deleteUsers = (req, res) => {
  userModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.json({ message: `Utilisateur non trouvé` });
      } else {
        result.destroy().then(() => {
          res.json({
            message: `Utilisateur supprimé : ${result.dataValues.id}`,
            data: result,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};

// UPDATE COWORKING ------------------------------------------------------------------

exports.updateUsers = (req, res) => {
  userModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: `L'utilisateur' avec l'id ${req.params.id} n'existe pas`,
        });
      } else {
        return bcrypt.hash(req.body.password, 10).then((hash) => {
          const dataUser = { ...req.body, password: hash };
          return result.update(dataUser).then(() => {
            res.json({
              message: `Utilisateur modifié : ${result.dataValues.id}`,
              data: result,
            });
          });
        });
      }
    })
    .catch((error) => {
      return res.json({
        message: `L'élément n'a pas pu être modifié. ${error}`,
      });
    });
};
