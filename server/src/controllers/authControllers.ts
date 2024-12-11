import "express-async-errors";
import mongoose from "mongoose";
import { UserModel } from "../models/UserSchema";
import { RequestHandler } from "express"; // type checks req,res, next
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";

export const registerUser: RequestHandler = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  const registeredUser = await UserModel.create(req.body);
  if (!registeredUser) {
    throw new ExpressError("Cannot register user", StatusCodes.BAD_REQUEST);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "User successfully registered", registeredUser });
};
