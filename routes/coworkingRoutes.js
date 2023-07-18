const express = require('express')
const router = express.Router()
const mockCoworkings = require('../db/mock-coworkings')
const coworkingController = require('../controllers/coworkingController')

router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    .post(coworkingController.createCoworkings)

router
    .route('/:id')
    .get(coworkingController.findCoworkingsByPk)
    .put(coworkingController.updateCoworkings)
    .delete(coworkingController.deleteCoworkings)

module.exports = router