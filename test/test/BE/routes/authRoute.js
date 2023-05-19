import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();

router.route("/login").post(authController.logIn);
router.route("/logout").post(authController.logOut);

export default router;
