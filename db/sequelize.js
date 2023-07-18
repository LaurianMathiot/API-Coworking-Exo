const { Sequelize, DataTypes } = require('sequelize');
const mockCoworkings = require('./mock-coworkings')

const sequelize = new Sequelize('coworking_exo', 'root', '', {
    host: 'localhost',
    dialect:'mariadb',
    logging: false
}); 

sequelize.authenticate()
    .then(() => {console.log('La connexion à la BDD a bien été établie.')})
    .catch(error => console.log(`Impossible de se connecter à la BDD ${error}`))

// Création d'une table
const getCoworkingModel = require('../models/coworkingModel')
const coworkingModel = getCoworkingModel(sequelize, DataTypes)


const initDb = () => {
    // Création d'un élément
    sequelize
    .sync({force: true})
    .then(() => {
        mockCoworkings.forEach(mock => {
            coworkingModel.create({
                name: mock.name,
                price: mock.price,
                superficy: mock.superficy,
                capacity: mock.capacity,
                address: mock.address
            })
        })         
    })
}

module.exports = {
    initDb
}