const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/")
  .get(userController.findAllUsers)
  .post(userController.createUsers);

router
  .route("/:id")
  .delete(userController.deleteUsers)
  .put(userController.updateUsers);

module.exports = router;
