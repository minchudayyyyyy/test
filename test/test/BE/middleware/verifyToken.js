import { Users } from "../model/model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import throwErr from "../utils/throwErr.js";
import jwt from "jsonwebtoken";

const verifyToken = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  !authHeader?.startsWith("Bearer ") && throwErr(401);
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    err && throwErr(403);
    const foundUser = await Users.findOne({ accessToken: token });
    !foundUser && throwErr("invalid token");
    next();
  });
});

export default verifyToken;
