import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomeLayout, Register, Login, ErrorPage, LandingPage } from "./utils";

import { action as registerAction } from "./pages/authPages/Register";
import { action as loginAction } from "./pages/authPages/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
          index: true,
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
