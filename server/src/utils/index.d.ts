import mongoose from "mongoose";

import { UserInterface } from "../models/UserSchema"; // Adjust the import path

declare global {
  namespace Express {
    interface User extends UserInterface {} // Extend Express User with your interface
  }
}

export interface ParamsInterface {
  id: string;
}

export interface UserDataInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id: mongoose.Types.ObjectId;
}
