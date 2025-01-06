import "express-async-errors";
import mongoose from "mongoose";
import UserModel from "../models/UserSchema";
import { RequestHandler } from "express"; // type checks req,res, next
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";
import { UserInterface } from "../models/UserSchema";
import { Request, Response } from "express-serve-static-core";
import { ParamsInterface, UserDataInterface } from "../utils/index";

/** REGISTER USER */
/** @RequestHandler type check for req,res,next provided by express */
/** @UserInterface interface for type checking the contents of USerSchema and as well as the data from req.body */
/** @setPassword method from passport local mongoose included in UserInterface type checking */

export const registerUser: RequestHandler = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  const { username, firstName, lastName, email, password }: UserInterface =
    req.body;

  const isAdmin = (await UserModel.countDocuments()) === 0;
  req.body.roles = isAdmin ? "admin" : "user";

  const registeredUser = await UserModel.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    roles: req.body.roles,
  });
  await registeredUser.setPassword(password);
  await registeredUser.save();

  if (!registeredUser) {
    throw new ExpressError("Cannot register user", StatusCodes.BAD_REQUEST);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "User successfully registered", registeredUser });
};

/** LOGIN USER */
export const loginUser: RequestHandler = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  const { username } = req.body;
  const loggedUser = await UserModel.findOne({ username });
  if (!loggedUser) {
    throw new ExpressError("Cannot find user", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ message: "User logged in", loggedUser });
};

/**LOGOUT USER */
export const logoutUser: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(StatusCodes.OK).json({ message: "User logged out" });
  });
};

/** UPDATE USER */
/** asserts req res then provide general types from a file created that contains supposed type for each values. */
export const updateUser: RequestHandler = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  const { id } = req.params;

  // assert that req.user exist
  if (!req.user) {
    throw new ExpressError("user is not defined", StatusCodes.BAD_REQUEST);
  }
  //protect profiles from being updated by other user
  if (req.user?._id !== id) {
    throw new ExpressError("User is not authorized", StatusCodes.UNAUTHORIZED);
  }

  const { username, firstName, lastName, email, password } = req.body;
  const foundUser = await UserModel.findById(id);

  if (!foundUser) {
    throw new ExpressError("Cannot find user", StatusCodes.NOT_FOUND);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    id,
    {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
    },
    { new: true }
  );

  if (!updateUser) {
    throw new ExpressError("Cannot update user", StatusCodes.BAD_REQUEST);
  }
  if (password) {
    await foundUser.setPassword(password);
    await foundUser.save();
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "User successfully updated", updatedUser });
};

/** GET LOGGED USER */
export const getLoggedUser: RequestHandler = async (req, res) => {
  if (!req.user) {
    throw new ExpressError("User is not logged in", StatusCodes.UNAUTHORIZED);
  }
  const foundLoggedUser = await UserModel.findById(req.user._id);
  if (!foundLoggedUser) {
    throw new ExpressError("Cannot find user", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ message: "User found", foundLoggedUser });
};
