const express = require("express");
const { userRegister, userSignin } = require("../userControler/userControler");
const userRouter = express.Router();

userRouter.route("/register").post(userRegister);
userRouter.route("/signin").post(userSignin);

module.exports = userRouter;
