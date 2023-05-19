import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dbConnect from "./config/dbConnect.js";
import authRoute from "./routes/authRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import orderRoute from "./routes/orderRoute.js";
import errHandler from "./middleware/errHandler.js";
import verifyToken from "./middleware/verifyToken.js";

const app = express();
const PORT = 5000;

dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const _dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/", express.static(_dirname));

app.use("/auth", authRoute);
app.use(verifyToken);
app.use("/inventory", inventoryRoute);
app.use("/order", orderRoute);

app.use(errHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
