import mongoose from "mongoose";
import asyncWrapper from "../utils/asyncWrapper.js";

const dbConnect = asyncWrapper(async (req, res) => {
  mongoose.set({ strictQuery: true });
  await mongoose.connect(process.env.DATABASE_URI);
});

export default dbConnect;
