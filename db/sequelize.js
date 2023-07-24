const { Sequelize, DataTypes } = require("sequelize");
const mockCoworkings = require("./mock-coworkings");
const roles = require("../db/roles.json");
const getReviews = require("../db/review.json");
const getUsers = require("../db/users.json");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("coworking_exo", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("La connexion à la BDD a bien été établie.");
  })
  .catch((error) =>
    console.log(`Impossible de se connecter à la BDD ${error}`)
  );

// Création d'une table
const getCoworkingModel = require("../models/coworkingModel");
const coworkingModel = getCoworkingModel(sequelize, DataTypes);

const getUserModel = require("../models/userModel");
const userModel = getUserModel(sequelize, DataTypes);

const getRoleModel = require("../models/roleModel");
const roleModel = getRoleModel(sequelize, DataTypes);

const getReviewModel = require("../models/reviewModel");
const reviewModel = getReviewModel(sequelize, DataTypes);

roleModel.hasMany(userModel);
userModel.belongsTo(roleModel);

const initDb = () => {
  // Création d'un élément
  sequelize.sync({ force: true }).then(() => {
    mockCoworkings.forEach((mock) => {
      coworkingModel.create({
        name: mock.name,
        price: mock.price,
        superficy: mock.superficy,
        capacity: mock.capacity,
        address: mock.address,
      });
    });

    getReviews.forEach((review) => {
      reviewModel.create({
        content: review.content,
        rating: review.rating,
      });
    });

    const rolePromises = roles.map((role) => {
      return roleModel.create({
        label: role.label,
      });
    });
    Promise.all(rolePromises).then(() => {
      roleModel.findOne({ where: { label: "editor" } }).then((role) => {
        bcrypt.hash("mdp", 10).then((hash) => {
          userModel.create({
            username: "Simon",
            password: hash,
            roleId: role.id,
          });
        });
      });
      roleModel.findOne({ where: { label: "admin" } }).then((role) => {
        bcrypt.hash("mdp", 10).then((hash) => {
          userModel.create({
            username: "Pierre",
            password: hash,
            roleId: role.id,
          });
        });
      });
    });
  });
};

module.exports = {
  initDb,
  coworkingModel,
  userModel,
  roleModel,
  reviewModel,
};
