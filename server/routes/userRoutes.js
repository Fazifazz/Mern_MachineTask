const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/userController");

userRouter.post("/postRegisterData", UserController.registerUser)
          .post("/postVerifyOtp", UserController.verifyOtp) 
          .post("/postResendOtp", UserController.ResendOtp)
          .post("/verifyLogin", UserController.verifyLogin)

module.exports = userRouter;
