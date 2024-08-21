import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    subscribe: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
