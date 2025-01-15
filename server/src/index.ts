import express, { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import { ExpressError } from "./ExpressError/ExpressError";
import authRouter from "./routes/authRoutes";
import recipeRouter from "./routes/recipeRoutes";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import UserModel, { UserInterface } from "./models/UserSchema";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

/** Connection DB */
/** @mongo_uri used in runtime check if process.env.MONGO_URI is properly defined */
const mongo_uri = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  if (!mongo_uri) {
    throw new ExpressError("mongo_uri is not defined", StatusCodes.BAD_REQUEST);
  }
  await mongoose.connect(mongo_uri);
}

/** Mongo store for sessions */
/** @store_secret runtime check verify process.env.STORE_SECRET*/

const store_secret = process.env.STORE_SECRET;
if (!store_secret) {
  throw new ExpressError("store secret not defined", StatusCodes.BAD_REQUEST);
}
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  touchAfter: 24 * 3600, // time period in seconds
  crypto: {
    secret: store_secret,
  },
});

/** Express sessions = creates req.session object*/
app.set("trust proxy", 1); // trust first proxy
/** @session_secret assert process.env.session is defined */

const session_secret = process.env.SESSION_SECRET;
if (!session_secret) {
  throw new ExpressError("session secret not defined", StatusCodes.BAD_REQUEST);
}
app.use(
  session({
    store,
    name: process.env.SESSION_NAME,
    secret: session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //session.expires expects a Date hence the format for defining the expire date
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

/** initializes passport for incoming requests */
/** creates a passport object in the session */
app.use(passport.initialize());
app.use(passport.session()); //allows persistent userdata in sessions

passport.use(UserModel.createStrategy()); // allows passport to use local strategy configured as plugin in UserModel.

passport.serializeUser(UserModel.serializeUser() as any);
passport.deserializeUser(UserModel.deserializeUser() as any);
// passport.serializeUser((user, done) => done(null, user._id));
// passport.deserializeUser(async (id, done) => {
//   const user = await UserModel.findById(id);
//   done(null, user);
// });

// app.use((req, res, next) => {
//   console.log(`This is the logged user: ${req.user}`);
//   //   console.log(req.session);
//   next();
// });

/** ROUTES */
app.use("/api/auth", authRouter);

app.use("/api/recipe", recipeRouter);


/** Page not found error middleware */
app.use("*", (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Page not found" });
});

/** @AppError define type checking for err  */
interface AppError extends Error {
  status?: number;
}

/** Express error middleware */
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || StatusCodes.BAD_REQUEST;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
