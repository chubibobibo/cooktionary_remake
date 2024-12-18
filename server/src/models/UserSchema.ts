import mongoose, { model, Document, InferSchemaType } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { roles } from "../utils/roles";

const { Schema } = mongoose;

/** @UserInterface type checks the content of the UserSchema object*/
/** extends @Document Ensures that UserInterface includes Mongoose's document properties like _id and createdAt. */
export interface UserInterface extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string;
  setPassword: (arg: string) => string; //accepts an argument of a string and returns a string
}

// Enforce type safety for UserSchema
const UserSchema = new Schema<UserInterface>(
  {
    username: {
      type: String,
      required: true,
      //   unique: true,
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
      unique: true,
    },

    roles: {
      type: String,
      enum: Object.values(roles),
    },
  },
  { timestamps: true }
);

/** @InferSchemaType Dynamically infers the TypeScript type of the schema, reducing manual effort and ensuring accuracy. */
type UserType = InferSchemaType<typeof UserSchema>;

/** You're free to define your User how you like. Passport-Local Mongoose will add a username,
 * hash and salt field to store the username, the hashed password and the salt value. */
UserSchema.plugin(passportLocalMongoose);

/** @model <UserType> Creates a Mongoose model with the inferred type. */
export default model<UserType>("UserModel", UserSchema);
