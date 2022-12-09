const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controllers");
const validate = require("../validators/validate");
const { checkSchema } = require("express-validator");
const signup_user_validationSchema = require("../validators/auth.validator");

authRouter.post("/login", authController.login);

authRouter.post(
  "/signup",
  validate(checkSchema(signup_user_validationSchema)),
  authController.signup
);

authRouter.delete("/delete_user/:id", authController.delete);

module.exports = authRouter;
