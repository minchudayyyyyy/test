import mongoose from "mongoose";
import throwErr from "../utils/throwErr.js";

const inventorySchema = new mongoose.Schema({
  sku: {
    type: String,
    require: [true, "sku required"],
  },
  description: {
    type: String,
    require: [true, "description required"],
  },
  instock: {
    type: Number,
    require: [true, "stock required"],
    default: 0,
    validate: (val) => {
      val < 0 && throwErr(400, "stock cannot be a negative number");
    },
  },
});

const orderSchema = new mongoose.Schema({
  item: {
    type: String,
    require: [true, "item required"],
  },
  price: {
    type: Number,
    default: 0,
    require: [true, "price required"],
    validate: (val) => {
      val < 0 && throwErr(400, "cannot be a negative number");
    },
  },
  quantity: {
    type: Number,
    require: [true, "quantity required"],
    default: 1,
    validate: (val) => {
      val < 0 && throwErr(400, "cannot be a negative number");
    },
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "username required"],
    validate: (val) => {
      const length = val.length;
      length <= 3 && throwErr(400, "username too short");
      length >= 16 && throwErr(400, "username too long");
    },
  },

  password: {
    type: String,
    require: [true, "password required"],
    validate: (val) => {
      const length = val.length;
      length <= 3 && throwErr(400, "password too short");
      length >= 16 && throwErr(400, "password too long");
    },
  },
  accessToken: { type: String },
});

const Users = mongoose.model("Users", userSchema);
const Inventories = mongoose.model("Inventories", inventorySchema);
const Orders = mongoose.model("Orders", orderSchema);

export { Users, Inventories, Orders };
