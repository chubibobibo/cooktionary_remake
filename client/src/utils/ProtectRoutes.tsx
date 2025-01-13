import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";

import { useNavigate } from "react-router-dom";

interface ProtectRoutesProps {
  children: React.ReactNode;
}

export const ProtectRoutes: React.FC<ProtectRoutesProps> = ({ children }) => {
  /** state to handle logged user data */
  const [loggedUser, setLoggedUser] = useState({ userData: {} });

  const navigate = useNavigate();

  useEffect(() => {
    const getLoggedUser = async () => {
      try {
        const response = await axios.get("/api/auth/getLoggedUser");
        console.log(response);
        setLoggedUser((prev) => {
          return { ...prev, userData: response };
        });
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err);
          toast.error(err?.response?.data?.message);
          navigate("/login");
        }
      }
    };
    getLoggedUser();
  }, []);

  console.log(loggedUser);

  //   return <>{loggedUser ? children : <Navigate to='/login' replace={true} />}</>;
  return <>{loggedUser && children} </>;
};
export default ProtectRoutes;
