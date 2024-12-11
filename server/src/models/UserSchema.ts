import mongoose from "mongoose";

const { Schema } = mongoose;

/** @UserType type checks the content of the UserSchema object*/
interface UserType {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

const UserSchema = new Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserType>("UserModel", UserSchema);
