const express = require("express");
const router = express.Router();
const coworkingController = require("../controllers/coworkingController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(coworkingController.findAllCoworkings)
  .post(
    authController.protect,
    authController.restrictTo("editor"),
    coworkingController.createCoworkings
  );

router
  .route("/:id")
  .get(coworkingController.findCoworkingsByPk)
  .put(coworkingController.updateCoworkings)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    coworkingController.deleteCoworkings
  );

module.exports = router;
