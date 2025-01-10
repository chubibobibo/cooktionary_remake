import { Outlet } from "react-router-dom";
import { Nav } from "../utils";
import { UserContextProvider } from "../context/ContextProvider";

function DashboardLayout() {
  return (
    <UserContextProvider>
      <Nav />
      <Outlet />
    </UserContextProvider>
  );
}
export default DashboardLayout;
