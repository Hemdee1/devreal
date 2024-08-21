import postingModel from "../models/posting.js";

export const createPost = async (req, res) => {
  const { title, vendor, location, city, state, country, totalBudget, date } =
    req.body;
  const userId = req.session.userId;

  try {
    if (
      !(title && vendor && location && city && state && country && totalBudget)
    ) {
      throw new Error("All credentials must be included");
    }

    const post = await postingModel.create({
      title,
      vendor,
      location,
      city,
      state,
      country,
      totalBudget,
      date,
      userId,
    });

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await postingModel.find();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export const getOnePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postingModel.findById(id);

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await postingModel.find({ userId });

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};
