import { RequestHandler } from "express";
import { ExpressError } from "../ExpressError/ExpressError";
import { StatusCodes } from "http-status-codes";

export const isLoggedIn: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next(
      new ExpressError("User is not authorized", StatusCodes.UNAUTHORIZED)
    );
  } else {
    return next();
  }
};
