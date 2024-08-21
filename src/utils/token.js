import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();
const secret = process.env.SECRET;

const createToken = (payload, expiryTime = "1d") => {
  const token = jwt.sign(payload, secret, { expiresIn: expiryTime });

  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, secret);

  return payload;
};

export { createToken, verifyToken };
