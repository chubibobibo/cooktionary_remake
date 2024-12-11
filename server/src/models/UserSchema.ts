import mongoose, { Model, InferSchemaType, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

/** @UserType type checks the content of the UserSchema object*/
interface UserInterface {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

type UserType = Model<UserInterface>;

const UserSchema = new Schema<UserInterface, UserType>(
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

/** You're free to define your User how you like. Passport-Local Mongoose will add a username,
 * hash and salt field to store the username, the hashed password and the salt value. */
UserSchema.plugin(passportLocalMongoose);
// type UserType = InferSchemaType<typeof UserSchema>;
export const UserModel = mongoose.model("UserModel", UserSchema);
// export default UserModel = mongoose.model("UserModel", UserSchema)
