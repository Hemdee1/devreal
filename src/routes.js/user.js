import { Router } from "express";
import {
  ConfirmPassword,
  Login,
  ResetPassword,
  Signup,
} from "../controller/user.js";

const userRoutes = Router();

userRoutes.post("/signup", Signup);
userRoutes.post("/login", Login);
userRoutes.post("/reset-password", ResetPassword);
userRoutes.post("/confirm-password/:token", ConfirmPassword);
// userRoutes.post("/update-profile", UpdateProfile);

export default userRoutes;
