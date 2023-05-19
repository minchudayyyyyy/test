import express from "express";
import orderController from "../controller/orderController.js";
const router = express.Router();

router.route("/search").get(orderController.filterDes);

export default router;
