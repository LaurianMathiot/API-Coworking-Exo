const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.route("/").get(userController.findAllUsers);

router.route("/signup").post(authController.signUp);

router.route("/login").post(authController.login);

router
  .route("/:id")
  .delete(authController.protect, userController.deleteUsers)
  .put(authController.protect, userController.updateUsers);

module.exports = router;
