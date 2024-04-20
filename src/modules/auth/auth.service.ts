import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userService from "../users/users.service";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

function hashPassword(plainPassword: string) {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(plainPassword, salt);
  return hashedPassword;
}

function validatePassword(plainPassowrd: string, hashedPassword: string) {
  return bcrypt.compareSync(plainPassowrd, hashedPassword);
}

function generateAccessToken(payload: object) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30m" });
  return token;
}

function generateRefreshToken(payload: object) {
  const token = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "24h"});
  return token;
}

async function signup(name: string, email: string, plainPassword: string) {
  const hashedPassword = hashPassword(plainPassword);
  const user = await userService.getUserByEmail(email);
  if (!user) {
    const { id } = await userService.createUser({
      name: name,
      email: email,
      hashedPassword: hashedPassword,
    });
    return {
      accessToken: generateAccessToken({ id }),
      refreshToken: generateRefreshToken({ id }),
    };
  }
}

async function login(email: string, plainPassword: string) {
  const user = await userService.getUserByEmail(email);
  if (user && validatePassword(plainPassword, user.hashedPassword)) {
    const id = user.id;
    return {
      accessToken: generateAccessToken({ id }),
      refreshToken: generateRefreshToken({ id }),
    }
  }
}

const authService = {
  login,
  signup,
};

export default authService;