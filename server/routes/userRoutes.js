const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/userController");
const IsUserAuthenticated = require("../middlewares/IsUserHasToken");

userRouter
  .post("/postRegisterData", UserController.registerUser)
  .post("/postVerifyOtp", UserController.verifyOtp)
  .post("/postResendOtp", UserController.ResendOtp)
  .post("/verifyLogin", UserController.verifyLogin)
  .get("/fetchUserData",IsUserAuthenticated, UserController.fetchUserData);

module.exports = userRouter;
