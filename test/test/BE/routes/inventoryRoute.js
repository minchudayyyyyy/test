import express from "express";
import inventoryController from "../controller/inventoryController.js";
const router = express.Router();

router.route("/").get(inventoryController.getAllProduct);
router.route("/search").get(inventoryController.filterQuantity);

export default router;
