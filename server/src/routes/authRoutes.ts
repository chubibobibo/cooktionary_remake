import express, { Request, Response, NextFunction } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/authControllers";
import {
  loginInputValidation,
  registerInputValidation,
} from "../middleware/InputValidation";
import passport from "passport";
import { StatusCodes } from "http-status-codes";
import { rateLimit } from "express-rate-limit";

const router = express.Router();

/** Api Limiter */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: "Too many attempts, Try again in 10 mins.",
  // store: ... , // Redis, Memcached, etc. See below.
});

//REGISTER
router.post("/register", registerInputValidation, registerUser);

//LOGIN
/** Function that executes passport.authenticate() using local strategy then */
/** Then calls a callback fn that accepts err, user, and next */
/** handles error by returning to the next middleware the err */
/** handles if no user by returning a status and a message*/
/** if auth is successfull use req.login() then handle if there are errors*/
/** returns loginUser function (controller)*/
router.post(
  "/login",
  limiter,
  loginInputValidation,
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "local",
      (err: Error, user: Express.User, info: any) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            message: info.message || "Username or password incorrect",
          });
        }
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          return loginUser(req, res, next);
        });
      }
    )(req, res, next);
  },
  loginUser
);

/** LOGOUT USER */
router.post("/logout", logoutUser);

/** UPDATE USER */
router.patch("/update/:id", updateUser);

export default router;
