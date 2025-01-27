import { createContext } from "react";

/** @loggedUser default value for createContext */
export const loggedUser = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  id: "",
  role: "",
};
export const loggedUserContext = createContext(loggedUser);

export const recipeDataContext = createContext(loggedUser);
