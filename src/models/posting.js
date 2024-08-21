import mongoose from "mongoose";

const postingSchema = new mongoose.Schema({
  userId: {
    // type: mongoose.Schema.ObjectId,
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  vendor: {
    type: [],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  totalBudget: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
  },
});

const postingModel = mongoose.model("posting", postingSchema);

export default postingModel;
