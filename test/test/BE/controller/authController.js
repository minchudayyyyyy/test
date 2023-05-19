import { Users } from "../model/model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import throwErr from "../utils/throwErr.js";
import jwt from "jsonwebtoken";

const authController = {
  logIn: asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await Users.findOne({ username, password });
    !foundUser && throwErr(404, "user not found");

    const newToken = jwt.sign({ username: foundUser.username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    });

    foundUser.accessToken = newToken;
    await foundUser.save();

    res.status(200).json({ username: foundUser.username, token: newToken });
  }),

  logOut: asyncWrapper(async (req, res) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    !authHeader?.startsWith("Bearer ") && throwErr(401);
    const token = authHeader.split(" ")[1];

    const foundUser = await Users.findOneAndUpdate({ accessToken: token }, { accessToken: "" });
    !foundUser && throwErr(400, "invalid token");

    res.status(200).json(`Log out account ${foundUser.username} successfully`);
  }),
};

export default authController;
