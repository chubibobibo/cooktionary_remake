import { useEffect, useState } from "react";
import { UserDataType } from "../types/InputProps";
import axios from "axios";
import { loggedUserContext } from "./Context";
import { loggedUser } from "./Context";

/** @interface to type the component UserContextProvider that accepts <children> a prop type of ReactNode */
interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  /** @userData state to contain user data when fetching from API */
  const [userData, setUserData] = useState<UserDataType>();

  useEffect(() => {
    // new instance of abort controller for cleanup function
    const controller = new AbortController();

    const getLoggedUser = async () => {
      try {
        const response = await axios.get("/api/auth/getLoggedUser");
        // console.log(response);
        setUserData(response.data.foundLoggedUser);
      } catch (err) {
        console.log(err);
      }
    };
    getLoggedUser();

    //cleanup function if a component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  return (
    /** @userData can be undefined so we need to provide a default value if it turns undefined using @loggedUser which we used as default value for the context we created */
    <loggedUserContext.Provider value={userData || loggedUser}>
      {children}
    </loggedUserContext.Provider>
  );
};
