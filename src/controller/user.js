import SignupTemplate from "../email templates/signup.js";
import ResetPasswordTemplate from "../email templates/reset-password.js";
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import sendMail from "../utils/sendMail.js";
import { createToken, verifyToken } from "../utils/token.js";

export const Signup = async (req, res) => {
  const { firstName, lastName, email, password, country, subscribe, type } =
    req.body;
  try {
    if (
      !(
        firstName &&
        lastName &&
        email &&
        password &&
        type &&
        country &&
        subscribe
      )
    ) {
      throw new Error("All credentials must be included");
    }

    // check for existing user
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      throw new Error("User already existed, log in");
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      type,
      country,
      subscribe,
      password: hashedPassword,
    });

    // send email that you've signed up succesfully
    const html = SignupTemplate({
      firstName: user.firstName,
      lastName: user.lastName,
    });

    await sendMail({
      email: user.email,
      subject: "Congratulation for Signing up on devreal",
      html,
    });

    // create a session for the user
    req.session.userId = user.id;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      throw new Error("All credentials must be included");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("Invalid credential");
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      throw new Error("Invalid credentials");
    }

    // create a session for the user
    req.session.userId = user.id;

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export const ResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("Account not found");
    }

    const payload = { id: user.id };
    const token = createToken(payload, "1h");

    const link = `http://localhost:3000/reset-password?token=${token}`;

    const html = ResetPasswordTemplate({
      firstName: user.firstName,
      link,
      expiryTime: "1 hour",
    });

    await sendMail({ email: user.email, subject: "Reset Password", html });

    res.json("Password reset link sent succesfully");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};

export const ConfirmPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const { id } = verifyToken(token);

    if (!id) {
      throw new Error("Link is invalid or expired");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.findByIdAndUpdate({
      password: hashedPassword,
    });

    res.json("Password changed succesfully");
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};
