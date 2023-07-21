const { Sequelize, DataTypes } = require("sequelize");
const mockCoworkings = require("./mock-coworkings");
const getRoles = require("../db/roles.json");
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

const initDb = () => {
  // Création d'un élément
  sequelize.sync({ force: true }).then(() => {
    mockCoworkings.forEach((mock) => {
      // coworkingModel.create({
      //   name: mock.name,
      //   price: mock.price,
      //   superficy: mock.superficy,
      //   capacity: mock.capacity,
      //   address: mock.address,
      // });
    });
    getRoles.forEach((element) => {
      roleModel.create({
        label: element.label,
      });
    });
    getUsers.forEach((element) => {
      bcrypt.hash(element.password, 10).then((hash) => {
        userModel.create({
          username: element.username,
          password: hash,
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
};
