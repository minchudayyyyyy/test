import asyncWrapper from "../utils/asyncWrapper.js";
import { Inventories, Orders } from "../model/model.js";
import throwErr from "../utils/throwErr.js";

const orderController = {
  filterDes: asyncWrapper(async (req, res) => {
    const { desc } = req.query;
    !desc && throwErr(400, "description query required");

    const foundProduct = await Inventories.findOne({ description: desc }).exec();
    const foundOrders = await Orders.find({ item: foundProduct.sku });

    return res.status(200).json({ total: foundOrders.length, list: foundOrders });
  }),
};

export default orderController;
