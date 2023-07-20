const { ValidationError } = require("sequelize");
const mockCoworkings = require("../db/mock-coworkings");
const { coworkingModel } = require("../db/sequelize");

// FIND ALL ------------------------------------------------------------------

exports.findAllCoworkings = (req, res) => {
  coworkingModel
    .findAll()
    .then((result) => {
      return res.json({
        message: `La liste des coworkings a bien été récupérée.`,
        data: result,
      });
    })
    .catch((error) => {
      return res.json({
        message: error,
      });
    });
};

// FIND BY PK ------------------------------------------------------------------

exports.findCoworkingsByPk = (req, res) => {
  coworkingModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: `Le coworking avec l'id ${req.params.id} n'existe pas`,
        });
      } else {
        res.json({
          message: `Le coworking avec l'id ${req.params.id} a bien été récupéré`,
          data: result,
        });
      }
    })
    .catch((error) => {
      return res.json({
        message: error,
      });
    });
};

// CREATE COWORKING ------------------------------------------------------------------

exports.createCoworkings = (req, res) => {
  const newCoworking = req.body;
  coworkingModel
    .create({
      name: newCoworking.name,
      price: newCoworking.price,
      superficy: newCoworking.superficy,
      capacity: newCoworking.capacity,
      address: newCoworking.address,
    })
    .then((coworking) => {
      return res.status(201).json({
        message: `L'élément ${newCoworking.name} a bien été créé.`,
        data: coworking,
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({
        message: `L'élément n'a pas pu être créé. ${error}`,
      });
    });
};

// UPDATE COWORKING ------------------------------------------------------------------

exports.updateCoworkings = (req, res) => {
  coworkingModel
    .update(req.body, {
      where: { id: req.params.id },
    })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          message: `Le coworking avec l'id ${req.params.id} n'existe pas`,
        });
      } else {
        res.json({
          message: `Le coworking avec l'id ${req.params.id} a bien été modifié`,
          data: result,
        });
      }
    })
    .catch((error) => {
      return res.json({
        message: `L'élément n'a pas pu être modifié. ${error}`,
      });
    });
};

// DELETE COWORKING ------------------------------------------------------------------

exports.deleteCoworkings = (req, res) => {
  coworkingModel
    .findByPk(req.params.id)
    .then((result) => {
      if (!result) {
        res.json({ message: `Coworking non trouvé` });
      } else {
        result.destroy().then(() => {
          res.json({
            message: `Coworking supprimé : ${result.dataValues.id}`,
            data: result,
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
};
