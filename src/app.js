// AUTHENTICATION BASED ON EXPRESS SESSION
// packages to install: express-session, connect-mongo

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import userRoutes from "./routes.js/user.js";
import postingRoutes from "./routes.js/posting.js";
import cors from "cors";

dotenv.config();

const app = express();

const MONGO_URI = process.env.MONGO_URI;
const PORT = 5000;
const SECRET = process.env.SECRET;

// middlewares
// middleware to accept a post request
app.use(express.urlencoded({ extended: true }));
// middleware to parse json file
app.use(express.json());

// set up cors
app.use(
  cors({
    origin: ["http://localhost:3000", "https://www.devreal.com"],
    credentials: true,
  })
);

const productionServer = (process.env.NODE_ENV = "PRODUCTION");

// express session
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24 * 3, //3 days
      httpOnly: true,
      secure: productionServer ? true : false,
      sameSite: productionServer ? "none" : "lax",
    },
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    }),
  })
);

// Routes
app.use("/user", userRoutes);
app.use("/post", postingRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("database connected succesfully");

    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("server starting on PORT:" + PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
