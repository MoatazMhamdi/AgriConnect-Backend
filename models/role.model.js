import mongoose from "mongoose";

const role = mongoose.model(
  "role",
  new mongoose.Schema({
    name: String
  })
);

export default role;
